from apiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
import pickle
from datetime import datetime, timedelta
from catergoryDict import categories as cDict
from strictCatDict import strictCat as sCDict
from os import path
import pyodbc
import pandas as pa
import json
import requests
# ################# insert to DB code ############################
# conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
#                     'Server=stream-hub.database.windows.net;'
#                     'Database=streamHub;'
#                      'UID=stream-hub;'
#                      'PWD=sS8370098;'
#                      'Integrated Security=False;'
#                      )
# ################# insert to DB code ############################

print("Scrapping data from: Google Calendars")

#Write path depending if on Linux Azure VM or Win laptop
if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/root/bin/datascrape"

### configuration ### (important to be above pickle creator)
scopes = ['https://www.googleapis.com/auth/calendar']

### Run in first time to get creds and store in pickle file
# flow = InstalledAppFlow.from_client_secrets_file("/GoogleCal/client_secret.json", scopes=scopes)
# credentials = flow.run_console()
# pickle.dump(credentials, open("/GoogleCal/token.pkl", "wb"))

# After getting pickle from first time creds
credentials = pickle.load(open(the_path + "/googlecal/token.pkl", "rb"))
service = build("calendar", "v3", credentials=credentials)


#create csv file
filename = the_path + "/data/googlecal.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    ### Get calendars and events ###

    # StreamHub.net@gmail.com's calendar:
    # sh_cal = service.calendarList().list().execute()
    # calendar_id = sh_cal['items'][0]['id']

    ### CALENDAR ID ###
    # Meetup girls' calendar
    calendar_id = "b3nqcakt7rveo0o2n57ev1jql0@group.calendar.google.com"

    #Only get events from NOW's time and later
    now = datetime.now()
    time_min = now.strftime("%Y-%m-%d"+"T"+"%H:%M:%S"+"+03:00")
    sh_events = service.events().list(calendarId=calendar_id, timeMin=time_min).execute()['items']

    ### Get info from events ###
    for e in sh_events:
        ### TITLE ###
        title = e['summary']

        # Only interesting in Streamhub's scrape for validation
        # status = e['status']

        ### TIME & DATE ### *if event have time defined
        start = e['start']
        if 'dateTime' in start:
            sTD = start['dateTime']
            tdSplit = sTD.split("T")
            date = tdSplit[0].split("-")
            time = tdSplit[1].split("+")[0][:-3]
        elif 'date' in start:
            date = start['date'].split("-")
        print(time)
        print(tdSplit[1])

        # ### UTC ###
        # utc = time = tdSplit[1][-6:]
        # utcPlusMinus = utc[:1]
        # utcTime = utc.split(":")
        # utcHours = float(utcTime[0][1:])
        # if utcTime[1] == "30":
        #     utcHours += .5

        ### FINAL DATE AND TIME IN UTC ###
        # 2017-11-28 23:55:59
        utcTime = time.split(":")
        hour = utcTime[0]
        minutes = utcTime[1]

        finalDT = datetime(int(date[0]), int(date[1]), int(date[2]), int(hour), int(minutes))
        finalDT = str(finalDT - timedelta(hours=3))[:-3]
        print(finalDT)

        showTimeDate = finalDT.split(" ")
        utcDate = showTimeDate[0]
        utcTime = showTimeDate[1]


        # ### END TIME & DATE ### (not interesting)
        # end = e['end']
        # if 'dateTime' in end:
        #     eTD = end['dateTime']
        #     tdSplit = eTD.split("T")
        #     endDate = ".".join(tdSplit[0].split("-")[::-1])
        #     endTime = tdSplit[1].split("+")[0][:-3]
        # elif 'date' in end:
        #     eDate = ".".join(end['date'].split("-")[::-1])

        ### URL ###
        eUrl = ""
        if 'description' in e:
            info = e['description'].strip().split(" ")
            for w in info:
                if "http" in w:
                    eUrl = w

        ### Caterogies ###
        titleL = set(title.lower().split(" "))
        eCat = set()
        # DYNAMIIC search title's words for caterogies
        for word in titleL:
            wordCat = {cDict[key] for key in cDict.keys() if word.find(key) != -1}
            for w in wordCat:
                eCat.add(w)

        # STRICT search title's words for caterogies
        eCatStrict = {sCDict[key] for key in sCDict.keys() & titleL}
        for c in eCatStrict:
            eCat.add(c)

        # order for catergory priority - kids > fitness > fun > lectures by
        eCat = list(eCat)
        if "kids" in eCat and len(eCat) > 1 and eCat.index("kids") != 0:
            kids = eCat.pop(eCat.index("kids"))
            eCat.insert(0, kids)
        elif "fitness" in eCat and len(eCat) > 1 and eCat.index("fitness") != 0:
            fitness = eCat.pop(eCat.index("fitness"))
            eCat.insert(0, fitness)
        elif "fun" in eCat and len(eCat) > 1 and eCat.index("fun") != 0:
            fun = eCat.pop(eCat.index("fun"))
            eCat.insert(0, fun)

        # stringify and "" format for database input
        eCat = str(eCat).replace("'", "''")
        print(f"eCat {eCat}")

        # write data in csv
        f.write(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl + "\n")
        print(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl)

    #     ################# insert to DB code ############################
    #     datespl = date.split('.')
    #     dateSql = datespl[2] + "-" + datespl[1] + "-" + datespl[0] + " " + time
    #     cursor = conn.cursor()
    #
    #     data = {'ItemTitle': title.replace("'", "''"), 'ItemURL': eUrl, 'ItemDescription': '', 'ItemTags': eCat,
    #             'ItemStartDate': '0',
    #             'ItemStartDateObj': dateSql, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 2,
    #             'ItemImgURL': '',
    #             'UserFavoriteItemID': 'NULL'}
    #
    #     data = (
    #         data['ItemTitle'], data['ItemURL'], data['ItemDescription'], data['ItemTags'],
    #         data['ItemStartDate'], data['ItemStartDateObj'], data['ItemDuration'], data['ItemOwner'],
    #         data['PlatformID'], data['ItemImgURL'], data['UserFavoriteItemID']
    #     )
    #
    #     insertStr = "insert into [dbo].[Items] ([ItemTitle],[ItemURL],[ItemDescription],[ItemTags],[ItemStartDate],[ItemStartDateObj],[ItemDuration],[ItemOwner],[PlatformID],[ItemImgURL],[UserFavoriteItemID])VALUES (N'%s', '%s','%s', '%s', '%s', '%s', '%s', '%s','%s','%s',%s)" % data
    #     cursor.execute(insertStr)
    #     conn.commit()
    # ################# insert to DB code ############################

f.close()
