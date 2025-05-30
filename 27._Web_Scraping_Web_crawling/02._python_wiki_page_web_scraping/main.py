import requests
from bs4 import BeautifulSoup

response = requests.get("https://en.wikipedia.org/wiki/List_of_Monty_Python_projects").text
parsed_html = BeautifulSoup(response, "lxml")

tags = parsed_html.find("div", {"class": "mw-parser-output"})

projects = {}

current_category = None

for tag in tags:
   if tag.name == "div" and tag.find("h2"):
        current_category = tag.text.replace("[edit]", "")
        projects[current_category] = []
   elif tag.name == "ul":
        for li in tag.find_all("li"):
            projects[current_category].append(li.text)

from pprint import pprint
pprint(projects)