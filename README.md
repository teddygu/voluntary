# Voluntary

Welcome to Voluntary - a React Native-based app that helps organizations get the word out for their volunteering events and incentivizes users to attend through the use of (hopefully eventually sponsored) bribes.

Voluntary is built around a point collection system, with users receiving points for physically attending events posted on the in-app map. When a user opens the app and is within the vicinity of a listed event, they will be marked as a participant. After spending some time at the event location, they will be marked as having participated in the event and points will be added to their account.

If this app were to actually be used in production, sponsorships or partnerships would need to be made to allow users to redeem their points for real-world items. Organizations would also be able to add their own events to the map.

## How we built it

Since we needed to generate some test data to display on the map, a simple scraper was built for the VolunteerMatch site to get locations of organizations in need of help. This location data was then dumped into the database as placeholder information for events and organizations.

For the frontend/app, we used React Native to model each component.

## What we learned

React is pain.

## Installation (App)

Clone the project, change to the `Frontend` directory, and run `npm install` and `npm start`. This will start an Expo server, which can be connected to from mobile devices with the `Expo Go` app installed. Make sure NodeJS and NPM are installed beforehand.

## Installation (Server)

This server was tested on Python 3.10. To install dependencies, run `python -m pip install -r requirements.txt` in the `Backend` directory. To start the webserver, run `python run.py`. The default host is 127.0.0.1 (localhost) and the default port is 8999.

## Screenshots
![HomeScreen](/Screenshots/home.png)
![MapScreen](/Screenshots/map.png)
![RewardsScreen](/Screenshots/rewards.png)
![SocialScreen](/Screenshots/social.png)
![ProfileScreen](/Screenshots/profile.png)