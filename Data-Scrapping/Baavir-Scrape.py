import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import io
import re
from catergoryDict import categories as cDict
from strictCatDict import strictCat as sCDict
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
################# insert to DB code ############################

print("Scrapping data from: Baavir.com")
myurl = "https://www.baavir.com/"

#Write path depending if on Linux Azure VM or Win laptop
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
filename = the_path + "/data/Baavir.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    #retrieve data
    info = page_soup.find("div", {"id":"comp-k8jqm5nb1inlineContent-gridContainer"})

    ### DATE ###
    #in the site the date is written once, above all events
    date = info.find("span", {"style":"font-size:38px;"}).text.split(" ")
    for d in date:
        if "." in d:
            date = d

    # retrieve events from page
    events = info.findAll("div", {"style":"display:flex;flex-direction:column"})
    for e in events:
        ### URL ###
        eUrl = e.find("a", {"class":"ImageButton_1link"})["href"]

        #Get specific event divs
        moreInfo = e.findAll("h4")
        #Get all event titles and time, exclude empty divs that have spans with wixguard
        pattern = re.compile('<span class="wixGuard">')
        titleTime = []
        for i in moreInfo:
            if pattern.search(str(i)) is not None or i.text.strip() == "" or i.text.strip() == " ":
                continue
            titleTime.append(i.text.strip())
        ### TIME ###
        time = titleTime.pop(0)
        ### TITLE ###
        title = " - ".join(titleTime)

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

        ### write data in csv
        f.write(date + ".," + time + ".," + title + ".," + eCat + ".," + eUrl + "\n")
        print(date + ".," + time + ".," + title + ".," + eCat + ".," + eUrl)

        ################# insert to DB code ############################
        datespl = date.split('.')
        dateSql = datespl[2] + "-" + datespl[1] + "-" + datespl[0] + " " + time
        cursor = conn.cursor()

        data = {'ItemTitle': title.replace("'", "''"), 'ItemURL': eUrl, 'ItemDescription': '', 'ItemTags': eCat,
                'ItemStartDate': '0',
                'ItemStartDateObj': dateSql, 'ItemDuration': 3600, 'ItemOwner': '', 'PlatformID': 2, 'ItemImgURL': '',
                'UserFavoriteItemID': 'NULL'}

        data = (
            data['ItemTitle'], data['ItemURL'], data['ItemDescription'], data['ItemTags'],
            data['ItemStartDate'], data['ItemStartDateObj'], data['ItemDuration'], data['ItemOwner'],
            data['PlatformID'], data['ItemImgURL'], data['UserFavoriteItemID']
        )

        insertStr = "insert into [dbo].[Items] ([ItemTitle],[ItemURL],[ItemDescription],[ItemTags],[ItemStartDate],[ItemStartDateObj],[ItemDuration],[ItemOwner],[PlatformID],[ItemImgURL],[UserFavoriteItemID])VALUES (N'%s', '%s','%s', '%s', '%s', '%s', '%s', '%s','%s','%s',%s)" % data
        cursor.execute(insertStr)
        conn.commit()
        ################# insert to DB code ############################

f.close()
