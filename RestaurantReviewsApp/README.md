# Restaurant Reviews App

## Introduction

This project is a Restaurant Reviews Web App. It provides reviews of a few restaurants based in US, which is located with the Google Maps API, along with details of it.

The webpages have been coded such that it is also a mobile-ready web application. Responsive on different sized displays and accessible for screen reader use. Service worker is also present for seamless offline experience for users.

## Instructions

In the index.html and restaurant.html file, replace the 'REPLACE_WITH_GOOGLE_API_KEY' with the Google Maps API key.

In a terminal, check the version of Python presently installed with the command `python -V`. If it's version Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (Or another port, if port 8000 is already in use. The port number will also need to be changed in the dbhelper.js file if another port is used.) For Python 3.x, the command is `python3 -m http.server 8000`. If Python needs to be installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

With your server running, visit the site: `http://localhost:8000` to see the content.
