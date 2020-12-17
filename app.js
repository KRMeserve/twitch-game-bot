const Player = require('./models/Player.js');
require('dotenv').config(); // accesses .env variables
const tmi = require("tmi.js"); // import tmi.js
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

const players = {};
client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (!players[tags.username]) {
    players[tags.username] = new Player(tags.username, tags.subscriber);
    console.log({players});
  }
  console.log({message, tags}); // you have access to a lot of information on the user that sent the message with tags
  if (message.toLowerCase() === "!coins") {
    client.say(channel, `@${tags.username} has ${players[tags.username].reportCoins()} coins!`);
  }
  else if (message.toLowerCase().includes("!steal")) {
    const target = message.toLowerCase().substring(message.indexOf('@') + 1);
    if (players[target]) {
      players[target].loseMoney();
      client.say(channel, players[tags.username].steal(target));
    } else {
      client.say(channel, `@${tags.username} tried to steal from no one. Remember to target someone by typing !steal @<username>`);
    }
  }
});
