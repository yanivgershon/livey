import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import io
import re
from catergoryDict import categories as cDict
from os import path
import pyodbc
import pandas as pa
import json
import requests
################# connect to DB code ############################
conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                    'Server=stream-hub.database.windows.net;'
                    'Database=streamHub;'
                     'UID=stream-hub;'
                     'PWD=sS8370098;'
                     'Integrated Security=False;'
                     )
g
################# connect to DB code ############################

queryStr='delete from Items where PlatformID=2'
cursor = conn.cursor()
cursor.execute(queryStr)
conn.commit()