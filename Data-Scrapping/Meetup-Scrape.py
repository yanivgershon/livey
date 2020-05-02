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

print("Scrapping data from: Meetup.com")

myurl = "https://www.meetup.com/find/events/?allMeetups=true&radius=100&userFreeform=tel&mcId=c1017962&change=yes"

#Write path depending if on Linux Azure VM or Win laptop
if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/root/bin/datascrape"

#Grabbing page
uClient = uReq(myurl)
page_html = uClient.read()
uClient.close()

#parses the info
page_soup = soup(page_html, "html.parser")

#create csv file
filename = the_path + "/data/Meetups.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    #retrieve events from page
    events = page_soup.findAll("li", {"itemtype":"http://data-vocabulary.org/Event"})
    # event1 = events[0]

    for event in events:
        ### DATE ###
        # date = event["data-day"] + "-" + event["data-month"] + "-" + event["data-year"].strip()

        ### TIME ###
        #turning am-pm to 24 hour writing
        fullTime = event.find("time").text.strip().split('\n')
        ampm = fullTime.pop()
        time = fullTime.pop()
        if ampm == "PM":
            if time[:-3] != "12":
                minutes = time[-2:]
                hour = str(int(time[:-3])+12)
                if hour == "24":
                    hour = "00"
                time = hour + ":" + minutes

        ### FINAL DATE AND TIME IN UTC ###
        # 2017-11-28 23:55:59
        finalDT = datetime(int(event["data-year"]), int(event["data-month"]), int(event["data-day"]), int(hour), int(minutes))
        finalDT = str(finalDT - timedelta(hours=3))[:-3]
        print(finalDT)

        showTimeDate = finalDT.split(" ")
        utcDate = showTimeDate[0]
        utcTime = showTimeDate[1]

        ### TITLE ###
        titles = event.findAll("span", {"itemprop":"name"})
        title = titles[1].text.strip()
        #make sure event is not postponed or cancelled
        lTitle = title.lower()
        if lTitle.find("postponed") != -1 or lTitle.find("cancelled") != -1 or lTitle.find("canceled") != -1:
            continue

        ### ORGANIZATION ### (Not interesting)
        organization = titles[0].text.strip()

        ### URL ###
        urls = event.findAll("a", {"itemprop":"url"})
        eUrl = urls[1]["href"].strip()

        ###Caterogies###
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

        #stringify and "" format for database input
        eCat = str(eCat).replace("'", "''")
        print(f"eCat {eCat}")

        # write data in csv
        f.write(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl + "\n")
        print(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl)

        # ################# insert to DB code ############################
        # datespl = date.split('.')
        # dateSql = datespl[2] + "-" + datespl[1] + "-" + datespl[0] + " " + time


        # cursor = conn.cursor()
        #
        # data = {'ItemTitle': title.replace("'", "''"), 'ItemURL': eUrl, 'ItemDescription': '', 'ItemTags': eCat,
        #         'ItemStartDate': '0',
        #         'ItemStartDateObj': dateSql, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 2, 'ItemImgURL': '',
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
