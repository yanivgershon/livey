from apiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
import pickle
from datetime import datetime
from catergoryDict import categories as cDict
from os import path

print("Scrapping data from: Google Calendars")

### configuration ###
scopes = ['https://www.googleapis.com/auth/calendar']

if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/home/streamhub/datascrape"

# Run in first time to get creds and store in pickle file
# flow = InstalledAppFlow.from_client_secrets_file("/GoogleCal/client_secret.json", scopes=scopes)
# credentials = flow.run_console()
# pickle.dump(credentials, open("/GoogleCal/token.pkl", "wb"))

# After getting pickle from first time creds
credentials = pickle.load(open(the_path + "/googlecal/token.pkl", "rb"))

service = build("calendar", "v3", credentials=credentials)


#create csv file
filename = the_path + "/data/streamhub-gcal.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    ### Get calendars and events ###

    # StreamHub.net@gmail.com's calendar:
    # sh_cal = service.calendarList().list().execute()
    # calendar_id = sh_cal['items'][0]['id']

    # Meetup girls' calendar
    calendar_id = "b3nqcakt7rveo0o2n57ev1jql0@group.calendar.google.com"

    example = "2020-04-01T10:00:00+03:00"
    now = datetime.now()
    time_min = now.strftime("%Y-%m-%d"+"T"+"%H:%M:%S"+"+03:00")

    sh_events = service.events().list(calendarId=calendar_id, timeMin=time_min).execute()['items']

    ### Get info from events ###

    for e in sh_events:
        title = e['summary']
        # print(title)
        status = e['status']
        # print(status)

        start = e['start']
        if 'dateTime' in start:
            sTD = start['dateTime']
            tdSplit = sTD.split("T")
            sDate = ".".join(tdSplit[0].split("-")[::-1])
            sTime = tdSplit[1].split("+")[0][:-3]
        elif 'date' in start:
            sDate = ".".join(start['date'].split("-")[::-1])

        end = e['end']
        if 'dateTime' in end:
            eTD = end['dateTime']
            tdSplit = eTD.split("T")
            endDate = ".".join(tdSplit[0].split("-")[::-1])
            endTime = tdSplit[1].split("+")[0][:-3]
        elif 'date' in end:
            eDate = ".".join(end['date'].split("-")[::-1])

        eUrl = ""
        if 'description' in e:
            info = e['description'].strip().split(" ")
            for w in info:
                if "http" in w:
                    eUrl = w

        titleL = title.lower().split(" ")
        eCat = {cDict[key] for key in cDict.keys() & set(titleL)}
        print(eCat)

        print(sDate + ".," + sTime + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
        #write data in csv
        f.write(sDate + ".," + sTime + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")

f.close()