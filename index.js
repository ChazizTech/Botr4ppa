const Discord = require('discord.js')
const { token, prefix } = require('./botsettings.json')
const fs = require('fs')

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command)
}

bot.once('ready', () => {
    console.log('Botr4ppa is online and is ready!')
});

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return

    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    
    if (!bot.commands.has(command)) return

    try {
        bot.commands.get(command).execute(msg, args)
    } catch (error) {
        console.error(error)
        msg.reply('There was an error while executing the command.')
    }
})

bot.login(token)