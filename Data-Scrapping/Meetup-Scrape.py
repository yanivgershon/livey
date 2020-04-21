import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
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

print("Scrapping data from: Meetup.com")

myurl = "https://www.meetup.com/find/events/?allMeetups=true&radius=100&userFreeform=Tel+Aviv%2C+Israel&mcName=Tel+Aviv%2C+IL&lat=32.066498&lon=34.765198"

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

#create csv file
filename = the_path + "/data/Meetups.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    #retrieve data
    events = page_soup.findAll("li", {"itemtype":"http://data-vocabulary.org/Event"})
    # event1 = events[0]

    for event in events:

        date = event["data-day"] + "." + event["data-month"] + "." + event["data-year"].strip()

        fullTime = event.find("time").text.strip().split('\n')
        ampm = fullTime.pop()
        time = fullTime.pop()
        if ampm == "PM":
            min = time[-3:]
            time = str(int(time[:-3])+12)+min
            if time =="24:00":
                time = "00:00"

        titles = event.findAll("span", {"itemprop":"name"})
        title = titles[1].text.strip()
        lTitle = title.lower()
        if lTitle.find("postponed") != -1 or lTitle.find("cancelled") != -1 or lTitle.find("canceled") != -1:
            continue

        organization = titles[0].text.strip()

        urls = event.findAll("a", {"itemprop":"url"})
        eUrl = urls[1]["href"].strip()

        titleL = title.lower().split(" ")
        eCat = {cDict[key] for key in cDict.keys() & set(titleL)}
#        print(eCat)

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
                'ItemStartDateObj': dateSql, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 2, 'ItemImgURL': '',
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
