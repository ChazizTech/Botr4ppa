const Discord = require('discord.js')

module.exports = {
    name: 'diceroll',
    description: 'Rolls a standard 6 sided dice.',
    cooldown: 2.5,
    guildOnly: true,
    execute(msg) {
        const rollEmbed = new Discord.MessageEmbed()
        .setAuthor(`🎲 ${Math.floor(Math.random() * (7 - 1) + 1)}`, msg.author.avatarURL({ dynamic: true, size: 256 }))
        .setColor(msg.guild.me.displayHexColor)

        msg.channel.send(rollEmbed)
    },
}