from urllib.request import urlopen as uReq
from urllib.request import Request
from bs4 import BeautifulSoup as soup
from datetime import datetime, timedelta
import io
import re
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

print("Scrapping data from: Zappa.co.il")

myurl = "https://www.zappa-club.co.il/content/the-show-must-go-on/"

#Write path depending if on Linux Azure VM or Win laptop
if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/root/bin/datascrape"

#Grapping page
req = Request(myurl, headers={'User-Agent': 'Mozilla/5.0'})
uClient = uReq(req)
page_html = uClient.read()
uClient.close()

#parses the info
page_soup = soup(page_html, "html.parser")

#create csv file
filename = the_path + "/data/Zappa.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    ### URL ###
    eUrl = myurl

    #retrieve page content
    ref = page_soup.find("div", {"class":"content_group wide_-content"})
    #filter all event p's
    events = ref.findAll("p")
    #find נתון לשינויים for reference (next day's event comes right after)
    pattern = re.compile("נתון לשינויים")
    #get נתון לשינויים's index by it's p
    eIndex = 0
    for i, e in enumerate(events):
        if pattern.search(str(e)) is not None:
            eIndex = i

    #get next day's event based on נתון לשינויים's index
    eList = str(events[eIndex+2]).split("<br/>")
    eList = [soup(l, "html.parser").text for l in eList]
    dateDay = eList.pop(0).split(" - ")
    ### DATE ###
    date = dateDay.pop().strip()

    ### WEEKDAY ### (not interesting)
    day = dateDay.pop().strip()


    for event in eList:
        if event.count("-") == 1:
            sEvent = event.split(" - ")
            ### TITLE ###
            title = sEvent.pop()
            ### TIME ###
            time = sEvent.pop()
        elif event.count("-") > 1:
            sEvent = event.split(" - ")
            ### TIME ###
            time = sEvent.pop(0)
            ### TITLE ###
            title = sEvent.pop(0)

        ### FINAL DATE AND TIME IN UTC ###
        # 2017-11-28 23:55:59
        utcTime = time.split(":")
        hour = utcTime[0]
        minutes = utcTime[1]
        utcDate = date.split(".")
        dateDay = utcDate[0]
        dateMonth = utcDate[1]

        finalDT = datetime(2020, int(dateMonth), int(dateDay), int(hour), int(minutes))
        finalDT = str(finalDT - timedelta(hours=3))[:-3]
        print(finalDT)

        showTimeDate = finalDT.split(" ")
        utcDate = showTimeDate[0]
        utcTime = showTimeDate[1]


        ### CATEGORY ###
        #Inputting manually, no title to search and is always FUN
        eCat = ['fun']
        eCat = str(eCat).replace("'", "''")
        # print(eCat)

        print(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl)
        # write data in csv
        f.write(utcDate + ".," + utcTime + ".," + title + ".," + eCat + ".," + eUrl + "\n")

        ################# insert to DB code ############################
        # datespl = date.split('.')
        # #unlike all other scrapes, ZAPPA doesn't have year in date
        # dateSql = "2020-" + datespl[1] + "-" + datespl[0] + " " + time


        # cursor = conn.cursor()
        # data = {'ItemTitle': title.replace("'", "''"), 'ItemURL': eUrl, 'ItemDescription': '', 'ItemTags': eCat,
        #         'ItemStartDate': '0',
        #         'ItemStartDateObj': dateSql, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 1, 'ItemImgURL': '',
        #         'UserFavoriteItemID': 'NULL'}
        #
        # data = (
        #     data['ItemTitle'], data['ItemURL'], data['ItemDescription'], data['ItemTags'],
        #     data['ItemStartDate'], data['ItemStartDateObj'], data['ItemDuration'], data['ItemOwner'],
        #     data['PlatformID'], data['ItemImgURL'], data['UserFavoriteItemID']
        # )
        #
        # # print(data)
        # insertStr = "insert into [dbo].[Items] ([ItemTitle],[ItemURL],[ItemDescription],[ItemTags],[ItemStartDate],[ItemStartDateObj],[ItemDuration],[ItemOwner],[PlatformID],[ItemImgURL],[UserFavoriteItemID])VALUES (N'%s', '%s','%s', '%s', '%s', '%s', '%s', '%s','%s','%s',%s)" % data
        # # print(insertStr)
        # cursor.execute(insertStr)
        # conn.commit()
        # ################# insert to DB code ############################

f.close()
