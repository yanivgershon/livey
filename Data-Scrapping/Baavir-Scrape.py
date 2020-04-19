import pyodbc
import pandas as pa
import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import io
import re
from catergoryDict import categories as cDict
from os import path
import json
import requests
################# insert to DB code ############################
conn = pyodbc.connect('Driver={ODBC Driver 13 for SQL Server};'
                    'Server=stream-hub.database.windows.net;'
                    'Database=streamHub;'
                     'UID=stream-hub;'
                     'PWD=sS8370098;'
                     'Integrated Security=False;'                                        
                     )
################# insert to DB code ############################
print("Scrapping data from: Baavir.com")
myurl = "https://www.baavir.com/"

if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else :
    if path.exists("D:/programming3/livey/Data-Scrapping"):
        the_path = "D:/programming3/livey/Data-Scrapping" 
    else:
        the_path = "/home/streamhub/datascrape"

#Grapping page
uClient = uReq(myurl)
page_html = uClient.read()
uClient.close()

#parses the info
page_soup = soup(page_html, "html.parser")
the_str="";
#create csv file
filename = the_path + "/data/Baavir.csv"
with open(filename, "w", encoding="utf=16") as f:

    #csv headers
    headers = "Date., Time., Title., Caterogies., Url\n"
    f.write(headers)

    #retrieve data
    info = page_soup.find("div", {"id":"comp-k8jqm5nb1inlineContent-gridContainer"})
    date = info.find("span", {"style":"font-size:38px;"}).text.split(" ")
    for d in date:
        if "." in d:
            date = d
    events = info.findAll("div", {"style":"display:flex;flex-direction:column"})
    for e in events:
        eUrl = e.find("a", {"class":"ImageButton_1link"})["href"]
        moreInfo = e.findAll("h4")
        pattern = re.compile('<span class="wixGuard">')
        titleTime = []
        for i in moreInfo:
            if pattern.search(str(i)) is not None or i.text.strip() == "" or i.text.strip() == " ":
                continue
            titleTime.append(i.text.strip())
        time = titleTime.pop(0)
        title = " - ".join(titleTime)

        titleL = title.lower().split(" ")
        eCat = {cDict[key] for key in cDict.keys() & set(titleL)}
################# insert to DB code ############################
        datespl=date.split('.')
        dateSql=datespl[2]+"-"+datespl[1]+"-"+datespl[0]+" "+time
        #print(eCat)
        the_str+=date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n";
        print(date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
        #write data in csv
        f.write(date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
        cursor = conn.cursor()
        catsReal=(str(list(eCat))).replace("'","''")
    #a = (datetime.datetime.now()).strftime("%Y-%m-%d %H:%M:%S")
        data =  {'ItemTitle':title.replace("'", "''"),'ItemURL':eUrl,'ItemDescription':'','ItemTags':catsReal,'ItemStartDate':'0',
        'ItemStartDateObj':dateSql,'ItemDuration': 3600,'ItemOwner':'','PlatformID': 1,'ItemImgURL':'',
        'UserFavoriteItemID':'NULL'}

        data = (
        data['ItemTitle'], data['ItemURL'], data['ItemDescription'], data['ItemTags'],
        data['ItemStartDate'], data['ItemStartDateObj'], data['ItemDuration'] ,data['ItemOwner'],
        data['PlatformID'], data['ItemImgURL'],data['UserFavoriteItemID']
        )

        #print(data)
        insertStr="insert into [dbo].[Items] ([ItemTitle],[ItemURL],[ItemDescription],[ItemTags],[ItemStartDate],[ItemStartDateObj],[ItemDuration],[ItemOwner],[PlatformID],[ItemImgURL],[UserFavoriteItemID])VALUES (N'%s', '%s','%s', '%s', '%s', '%s', '%s', '%s','%s','%s',%s)" % data
        #print(insertStr)
        cursor.execute(insertStr)
        conn.commit()
################# insert to DB code ############################

        #insertStr='''
        #       INSERT INTO [dbo].[Items]
        #   ([ItemTitle]
        #   ,[ItemURL]
        #   ,[ItemDescription]
        #   ,[ItemTags]
        #   ,[ItemStartDate]
        #   ,[ItemStartDateObj]
        #   ,[ItemDuration]
        #   ,[ItemOwner]
        #   ,[PlatformID]
        #   ,[ItemImgURL]
        #   ,[UserFavoriteItemID])
     #VALUES
      #     (''' +title+''+'''
       #    ,'''+''+eUrl+''+'''
       #    ,'',>
        #   ,'''+str(list(eCat))+'''
        #   ,0,>
        #   ,'''+''+date+' '+time+''+''',>
        #   ,3600,>
        #   ,'',>
        #   ,1,>
        #   ,'',>
        #   ,1,>)

        #        '''
        print(insertStr)
        cursor.execute(insertStr)
        conn.commit()

f.close()
#conn = pyodbc.connect('Driver={SQL Server};'
#                      'Server=DESKTOP-KN9QG2P\SQLEXPRESS;'
#                      'Database=skyCommerceDraft;'
#                      'Trusted_Connection=yes;')


#conn = pyodbc.connect(driver='{SQL Server}', host='stream-hub.database.windows.net', database='streamHub','Integrated Security'=False, user='stream-hub', password='sS8370098')
#cursor = conn.cursor()
#cursor.execute('Insert into Items')
#query = 'SELECT name FROM sys.databases'
#OutputDataSet = pa.read_sql(query,connection)

#for row in cursor:
#   print(row)

#api_url_base = 'https://localhost:44339/api/csvprocessing';
#headers = {'Content-Type': 'application/json'}
#data ={'data':the_str};
#r = requests.post(url = api_url_base, data = data) ;
#print(r.text);

