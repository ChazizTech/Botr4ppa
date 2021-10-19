const Discord = require('discord.js')
const { prefix, owners, cake } = require('./botsettings.json')
const { token } = require('./token.json')
const fs = require('fs')
const logger = require("beautiful-logs.js")

const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
bot.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const cooldowns = new Discord.Collection()

for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command)
}

bot.once('ready', () => {
    logger.boot('Botrappa is now online.')
    bot.user.setPresence({ //this is what i found to be the best status.
        activity: { name: `for b4! | ${bot.guilds.cache.size} servers`, type: 'WATCHING' },
        status: 'idle'
    })
}); 

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return

    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (command == undefined) return    
    if (command.guildOnly && msg.channel.type === 'dm') {
        return msg.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments!`

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        }
        return msg.reply(reply)
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    if (command.ownerOnly) {
        var isOwner = owners.includes(msg.author.id) ? true:false
        if (isOwner == false) return msg.reply("You do not have permission to execute this command!")
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before using \`${command.name}\` again!`)
        }
    }

    timestamps.set(msg.author.id, now)
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)

    try {
        command.execute(msg, args)
        logger.command(`${msg.author.tag} (${msg.author.id}) has used command ${command.name} in ${msg.guild.name}`)
    } catch (error) {
        logger.err(error)
        msg.reply('There was an error while executing the command.')
    }
})

bot.on('guildCreate', guild => {
    const guildInfo = {"id":`${guild.id}`,"modlogid": "undefined"}
    const data = JSON.stringify(guildInfo)

    try {
        fs.writeFileSync('serversettings.json', data)
        logger.info("Guild settings created!")
    } catch (error) { logger.err(error) }
})

bot.login(token)
