from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
from datetime import datetime, timedelta
import io
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

print("Scrapping data from: Eventbrite.com")

myurl = "https://www.eventbrite.com/d/online/israel/?page=1"

#Write path depending if on Linux Azure VM or Win laptop
if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/home/streamhub/datascrape"

#Grapping page
uClient = uReq(myurl)
page_html = uClient.read()
uClient.close()

#parses the info
page_soup = soup(page_html, "html.parser")

#pages
pages = int(page_soup.find("li", {"class": "eds-pagination__navigation-minimal"}).text.strip()[-1:])

#create csv file
filename = the_path + "/data/Eventbrite.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    for p in range(pages):
        # print("Scrapping page " + str(p+1))
        myurl = "https://www.eventbrite.com/d/online/israel/?page=" + str(p+1)

        # Grapping page
        uClient = uReq(myurl)
        page_html = uClient.read()
        uClient.close()

        # parses the info
        page_soup = soup(page_html, "html.parser")

        # retrieve events from page
        events = page_soup.findAll("article", {"class":"eds-event-card-content--mini"})
        for event in events:

            ### TITLE ###
            title = event.find("div",{"class":"eds-event-card__formatted-name--is-clamped"}).text
            # make sure event is not postponed or cancelled
            lTitle = title.lower()
            if lTitle.find("postponed") != -1 or lTitle.find("cancelled") != -1:
                continue

            ### URL ###
            eUrl = event.find("a", {"class": "eds-event-card-content__action-link"})["href"]

            timeDate = event.find("div", {"class":"eds-text-color--primary-brand"}).text.strip()
            print(timeDate)
            #if event has specific dates and is not today\tmrw
            if timeDate.find(",") != -1:
                dt = timeDate.split(", ")

                ### TIME ##
                fullTime = dt.pop().split(" ")

                # If AM stays untouched
                time = fullTime[1].split(":")

                # Time if PM (and not 12, then change to 24 hour)
                if fullTime[2] == "PM":
                    #Noon is written as 12:00pm
                    if time[0] != "12":
                        time[0] = str(int(time[0])+12)
                        #24 not allowed in DB
                        if time[0] == "24":
                            time[0] = "00"

                #Change month name to month number
                fMD = dt.pop().split(" ")
                if fMD[0] == "Apr":
                    fMD[0] = "04"
                elif  fMD[0] == "May":
                    fMD[0] = "05"
                elif  fMD[0] == "Jun":
                    fMD[0] = "06"
                elif fMD[0] == "Jul":
                    fMD[0] = "07"
                elif  fMD[0] == "Aug":
                    fMD[0] = "08"
                elif  fMD[0] == "Sep":
                    fMD[0] = "09"
                elif  fMD[0] == "Oct":
                    fMD[0] = "10"
                elif  fMD[0] == "Nov":
                    fMD[0] = "11"
                elif  fMD[0] == "Dec":
                    fMD[0] = "12"
                elif  fMD[0] == "Jan":
                    fMD[0] = "01"
                elif  fMD[0] == "Feb":
                    fMD[0] = "02"
                elif  fMD[0] == "Mar":
                    fMD[0] = "03"
                ### DATE ###
                # date = "2020-" + fMD[0] + "-" + fMD[1]

                ### UTC ###
                utc = timeDate.split("(").pop()[:-1]
                utcPlusMinus = utc[:1]
                utcTime = utc.split(":")
                utcHours = float(utcTime[0][1:])
                if utcTime[1] == "30":
                    utcHours += .5

                ### FINAL DATE AND TIME IN UTC ###
                # 2017-11-28 23:55:59
                finalDT = datetime(2020, int(fMD[0]), int(fMD[1]), int(time[0]), int(time[1]))
                if utcPlusMinus == "+":
                    finalDT = str(finalDT + timedelta(hours=utcHours))[:-3]
                elif utcPlusMinus == "-":
                    finalDT = str(finalDT - timedelta(hours=utcHours))[:-3]
                print(finalDT)

                showTimeDate = finalDT.split(" ")
                utcDate = showTimeDate[0]
                utcTime = showTimeDate[1]

            #if today\tmrw and doesn't have a date
            # else:
            #     dt = timeDate.split(" at ")
            #
            #     ### TIME ###
            #     fullTime = dt.pop().split(" ")
            #     time = fullTime[1]
            #     exactTime = fullTime[1].split(":")
            #     #If am-pm - change to 24 hour
            #     if fullTime[2] == "PM":
            #         exactTime[0] = str(int(exactTime[0])+12)
            #         #24 not allowed in DB
            #         if exactTime[0] == "24":
            #             exactTime[0] = "00"
            #         time = ":".join(exactTime)
            #
            #     ### DATE ###
            #     #Get today \ tmrw's dates
            #     fMD = dt.pop()
            #     if fMD == "Today":
            #         date = datetime.today().strftime('%d.%m.%Y')
            #     elif fMD == "Tomorrow":
            #         raw_date = datetime.today() + timedelta(days=1)
            #         date = raw_date.strftime('%d.%m.%Y')

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
            # print(f"eCat {eCat}")

            ### write data in csv
            f.write(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl + "\n")
            print(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl + "\n")

            # ################# insert to DB code ############################
            ###IRRELEVANT---v
            # datespl = date.split('.')
            # dateSql = datespl[2] + "-" + datespl[1] + "-" + datespl[0] + " " + time


            # cursor = conn.cursor()
            #
            # data = {'ItemTitle': title.replace("'", "''"), 'ItemURL': eUrl, 'ItemDescription': '', 'ItemTags': eCat,
            #         'ItemStartDate': '0',
            #         'ItemStartDateObj': finalDT, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 2,
            #         'ItemImgURL': '',
            #         'UserFavoriteItemID': 'NULL'}
            #
            # data = (
            #     data['ItemTitle'], data['ItemURL'], data['ItemDescription'], data['ItemTags'],
            #     data['ItemStartDate'], data['ItemStartDateObj'], data['ItemDuration'], data['ItemOwner'],
            #     data['PlatformID'], data['ItemImgURL'], data['UserFavoriteItemID']
            # )
            #
            # insertStr = "insert into [dbo].[Items] ([ItemTitle],[ItemURL],[ItemDescription],[ItemTags],[ItemStartDate],[ItemStartDateObj],[ItemDuration],[ItemOwner],[PlatformID],[ItemImgURL],[UserFavoriteItemID])VALUES (N'%s', '%s','%s', '%s', '%s', '%s', '%s', '%s','%s','%s',%s)" % data
            # cursor.execute(insertStr)
            # conn.commit()
            # ################# insert to DB code ############################

f.close()
