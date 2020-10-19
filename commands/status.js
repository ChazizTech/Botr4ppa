const Discord = require('discord.js')
const { version } = require('../package.json')

module.exports = {
    name: 'status',
    description: 'Gives statistics of the bot.',
    aliases: ['statistics', 'stats'],
    guildOnly: true,
    execute(msg) {
        const embed = new Discord.MessageEmbed()
        .setAuthor('🖥 Botr4ppa Status', msg.client.user.avatarURL({ dynamic: true, size: 256 }))
        .setColor(msg.guild.me.displayHexColor)
        .setFooter(`Botr4ppa | v${version}`)
        .addFields(
            { name: 'Ping', value: `${msg.client.ws.ping}ms` },
            { name: 'Memory', value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB" },
            { name: 'Uptime', value: Math.round(msg.client.uptime / (1000 * 60 * 60)) + " hours, " + (Math.round(msg.client.uptime / (1000 * 60)) % 60) + " minutes" },
            { name: 'Node version', value: process.version },
            { name: 'Servers', value: msg.client.guilds.cache.size }
        )

        msg.channel.send(embed)
    },
}