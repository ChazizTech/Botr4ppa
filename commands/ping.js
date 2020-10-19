const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Gives you the ping of the bot.',
    execute(msg) {
        const pingEmbed = new Discord.MessageEmbed()
        .setAuthor(`Pong! ${msg.client.ws.ping}ms`, msg.client.user.avatarURL({ dynamic: true, size: 256 }))
        .setColor(msg.guild.me.displayHexColor)

        msg.channel.send(pingEmbed)
    },
}