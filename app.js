// import packages
const _ = require('lodash');
const https = require('https');
require('dotenv').config(); // accesses .env variables
const tmi = require("tmi.js"); // import tmi.js
// import models
const Player = require('./models/Player.js');

// Set up client
const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.TWITCH_USERNAME_BOT,
    password: process.env.TWITCH_PASSWORD_BOT,
  },
  channels: [process.env.TWITCH_USERNAME],
});
client.connect().catch(console.error);

/**  
 * Twitch chat "Game".
*/
const players = {};
const checkWin = (tags) => {
  for (let i = 0; i < _.size(players); i++) {
    if (players[tags.username].coins >= 150) {
      client.say(
        process.env.TWITCH_CHANNEL,
        `${players[tags.username].name} wins! They collected ${
          players[tags.username].coins
        } by stealing from everyone! Resetting everyone's coins to 100.`
      );
      for (let i = 0; i < _.size(players); i++) {
        players[tags.username].resetCoins();
      }
    }
  };
};
client.on("message", (channel, tags, message, self) => {
  // bot doesn't read its own messages
  if (self) return;

  // if player doesn't exist yet, add them to the players
  if (!players[tags.username]) {
    players[tags.username] = new Player(tags.username, tags.subscriber);
  }
  // console.log({message, tags}); // you have access to a lot of information on the user that sent the message with tags

  if (message.toLowerCase() === "!coins") {
    // the user can check their coins anytime
    client.say(
      channel,
      `@${tags.username} has ${players[tags.username].reportCoins()} coins!`
    );
  }

  // steal coins from someone
  if (message.toLowerCase().includes("!steal")) {
    const target = message.toLowerCase().substring(message.indexOf("@") + 1);
    if (players[target]) {
      players[target].loseMoney();
      players[tags.username].steal(target);
      checkWin(tags);
    } else {
      client.say(
        channel,
        `@${tags.username} tried to steal from no one. Remember to target someone by typing !steal @<username>`
      );
    }
  }

/**
 * Random commands
 */

  // DAD JOKES - api calls
  if (message.toLowerCase() === "!dadjoke") {
    // api call options
    const options = {
      hostname: "icanhazdadjoke.com",
      headers: { Accept: "text/plain" },
      path: "/",
      method: "GET",
    };
    // request
    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        // posting the plain text response into the chat
        client.say(channel, `${d}`);
      });
    });

    req.end();
  }
  // Flip desk
  if (message.toLowerCase() === "!flipdesk") {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
      client.say(channel, `(╯°□°）╯︵ ┻━┻`);
    } else if (randomNumber === 1) {
      client.say(channel, `┻━┻ ︵ ヽ(°□°ヽ)`);
    } else {
      client.say(channel, `┬─┬ノ( º _ ºノ)`);
    }
  }
});
