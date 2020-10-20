const Discord = require('discord.js')
const { token, prefix, owners } = require('./botsettings.json')
const fs = require('fs')

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const cooldowns = new Discord.Collection()

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
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (command.guildOnly && message.channel.type === 'dm') return message.reply('I can\'t run that command inside DMs!');

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
    } catch (error) {
        console.error(error)
        msg.reply('There was an error while executing the command.')
    }
})

bot.login(token)
