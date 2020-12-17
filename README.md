# twitch-game-bot
Twitch Bot for Creating a Chat Game

## To Run Locally

Clone the repo locally and then run `npm i` to install the packages. 

Fill in the .env file with your personal twitch channel's information. The variables should be named as follows:
```
TWITCH_CHANNEL="#your channel"
TWITCH_USERNAME="your channel name"
TWITCH_USERNAME_BOT="your bot's channel name"
TWITCH_PASSWORD_BOT="oauth:your bot's OAuth token"
```
The OAuth token can be obtained from https://twitchapps.com/tmi/ after you log in with the correct account. 

Run either of the following, depending on whether you're using nodemon or not:
```
node app.js
OR
nodemon app.js
```

You should see the following output if everything works - and then your bot will be connected to your chat! Enjoy!
```
[08:00] info: Connecting to irc-ws.chat.twitch.tv on port 443..
[08:00] info: Sending authentication to server..
[08:00] info: Connected to server.
[08:00] info: Executing command: JOIN #your channel
[08:00] info: [#your channel] Now hosting nerdragefred for 0 viewer(s).
[08:00] info: Joined #your channel
```

## Current Commands
- !flipTable
- !dadJoke
- !coins
- !steal @<username>

## To Do

- Create a real text-based game that can run in chat. Ideally one that is a bit deeper than the steal coins game that is currently in place. Potentially an rpg?
- Hook up the bot to a backend so it can save users so they don't lose their progress in the game every time I stop the bot from running. 
- Add a UI to the bot that could let people just download a program and run/control the bot without any programming knowledge.