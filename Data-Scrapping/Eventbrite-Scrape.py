import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
from datetime import datetime, timedelta
import io
from catergoryDict import categories as cDict
from os import path
import pyodbc
import pandas as pa
import json
import requests
################# insert to DB code ############################
conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                    'Server=stream-hub.database.windows.net;'
                    'Database=streamHub;'
                     'UID=stream-hub;'
                     'PWD=sS8370098;'
                     'Integrated Security=False;'
                     )
the_str=""
################# insert to DB code ############################

print("Scrapping data from: Eventbrite.com")

myurl = "https://www.eventbrite.com/d/online/israel/?page=1"

if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/root/bin/datascrape"

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

        #retrieve data
        events = page_soup.findAll("div", {"class":"eds-media-card-content__content-container eds-l-pad-right-2"})
        events = events[::2]
        for event in events:

            title = event.find("div",{"class":"eds-event-card__formatted-name--is-clamped"}).text
            lTitle = title.lower()
            if lTitle.find("postponed") != -1 or lTitle.find("cancelled") != -1:
                continue
            eUrl = event.find("a", {"class":"eds-media-card-content__action-link"})["href"]

            timeDate = event.find("div", {"class":"eds-text-color--primary-brand"}).text.strip()

            #if event has specific dates
            if timeDate.find(",") != -1:
                dt = timeDate.split(", ")

                fullTime = dt.pop().split(" ")
                print(fullTime)
                time = fullTime[0]
                exactTime = fullTime[0].split(":")
                if fullTime[1] == "PM":
                    exactTime[0] = str(int(exactTime[0])+12)
                    print(exactTime)
                    if exactTime[0] == "24":
                        exactTime[0] = "00"
                    time = ":".join(exactTime)
                fMD = dt.pop().split(" ")
                if fMD[0] == "Apr":
                    fMD[0] = "4"
                elif  fMD[0] == "May":
                    fMD[0] = "5"
                elif  fMD[0] == "Jun":
                    fMD[0] = "6"
                elif fMD[0] == "Jul":
                    fMD[0] = "7"
                elif  fMD[0] == "Aug":
                    fMD[0] = "8"
                elif  fMD[0] == "Sep":
                    fMD[0] = "9"
                elif  fMD[0] == "Oct":
                    fMD[0] = "10"
                elif  fMD[0] == "Nov":
                    fMD[0] = "11"
                elif  fMD[0] == "Dec":
                    fMD[0] = "12"
                elif  fMD[0] == "Jan":
                    fMD[0] = "1"
                elif  fMD[0] == "Feb":
                    fMD[0] = "2"
                elif  fMD[0] == "Mar":
                    fMD[0] = "3"
                date = fMD[1] + "." + fMD[0] + ".2020"

                weekday = dt.pop()

            #if today\tmrw and doesn't have a date
            else:
                dt = timeDate.split(" at ")

                fullTime = dt.pop().split(" ")
                time = fullTime[0]
                exactTime = fullTime[0].split(":")
                if fullTime[1] == "PM":
                    exactTime[0] = str(int(exactTime[0])+12)
                    print(exactTime)
                    if exactTime[0] == "24":
                        exactTime[0] = "00"
                    time = ":".join(exactTime)

                fMD = dt.pop()
                if fMD == "Today":
                    date = datetime.today().strftime('%d.%m.%Y')
                elif fMD == "Tomorrow":
                    raw_date = datetime.today() + timedelta(days=1)
                    date = raw_date.strftime('%d.%m.%Y')

            titleL = title.lower().split(" ")
            eCat = {cDict[key] for key in cDict.keys() & set(titleL)}
#            print(eCat)

            ################# insert to DB code ############################
            datespl = date.split('.')
            dateSql = datespl[2] + "-" + datespl[1] + "-" + datespl[0] + " " + time
            # print(eCat)
            the_str += date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n";
            print(date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
            # write data in csv
            f.write(date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
            cursor = conn.cursor()
            catsReal = (str(list(eCat))).replace("'", "''")
            # a = (datetime.datetime.now()).strftime("%Y-%m-%d %H:%M:%S")
            data = {'ItemTitle': title.replace("'", "''"), 'ItemURL': eUrl, 'ItemDescription': '', 'ItemTags': catsReal,
                    'ItemStartDate': '0',
                    'ItemStartDateObj': dateSql, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 2,
                    'ItemImgURL': '',
                    'UserFavoriteItemID': 'NULL'}

            data = (
                data['ItemTitle'], data['ItemURL'], data['ItemDescription'], data['ItemTags'],
                data['ItemStartDate'], data['ItemStartDateObj'], data['ItemDuration'], data['ItemOwner'],
                data['PlatformID'], data['ItemImgURL'], data['UserFavoriteItemID']
            )

            # print(data)
            insertStr = "insert into [dbo].[Items] ([ItemTitle],[ItemURL],[ItemDescription],[ItemTags],[ItemStartDate],[ItemStartDateObj],[ItemDuration],[ItemOwner],[PlatformID],[ItemImgURL],[UserFavoriteItemID])VALUES (N'%s', '%s','%s', '%s', '%s', '%s', '%s', '%s','%s','%s',%s)" % data
            # print(insertStr)
            cursor.execute(insertStr)
            conn.commit()
        ################# insert to DB code ############################

f.close()
