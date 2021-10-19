// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./token.json');
const logger = require("beautiful-logs.js")

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	logger.boot('Botrappa SHOULD BE ready.')
});

// Login to Discord with your client's token
client.login(token);