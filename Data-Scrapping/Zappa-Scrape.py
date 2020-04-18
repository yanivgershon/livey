import bs4
from urllib.request import urlopen as uReq
from urllib.request import Request
from bs4 import BeautifulSoup as soup
import io
import re
from catergoryDict import categories as cDict
from os import path

print("Scrapping data from: Zappa.co.il")

myurl = "https://www.zappa-club.co.il/content/the-show-must-go-on/"

if path.exists("C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"):
    the_path = "C:/Users/omerm/Desktop/Hackorona/Data-Scrapping"
else:
    the_path = "/home/streamhub/datascrape"

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
    #retrieve data
    eUrl = myurl

    ref = page_soup.find("div", {"class":"content_group wide_-content"})
    events = ref.findAll("p")
    pattern = re.compile("נתון לשינויים")
    eIndex = 0
    for i, e in enumerate(events):
        if pattern.search(str(e)) is not None:
            print(e)
            eIndex = i
    # dateday = events[eIndex+1].find("strong").text.split("-")


    eList = str(events[eIndex+2]).split("<br/>")
    eList = [soup(l, "html.parser").text for l in eList]
    dateDay = eList.pop(0).split(" - ")
    date = dateDay.pop().strip()
    day = dateDay.pop().strip()
    # print("day " + day)
    # print("date " + date)

    for event in eList:
        if event.count("-") == 1:
            sEvent = event.split(" - ")
            title = sEvent.pop()
            time = sEvent.pop()
        elif event.count("-") > 1:
            sEvent = event.split(" - ")
            time = sEvent.pop(0)
            title = sEvent.pop(0)

        eCat = {"shows"}

        print(date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
        #write data in csv
        f.write(date + ".," + time + ".," + title + ".," + str(list(eCat)) + ".," + eUrl + "\n")
#
f.close()