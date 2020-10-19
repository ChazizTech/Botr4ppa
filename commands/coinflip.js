const Discord = require('discord.js')

module.exports = {
    name: 'coinflip',
    description: 'Flips a coin.',
    aliases: ['flipacoin', 'flipcoin'],
    guildOnly: true,
    execute(msg) {
        const flipOptions = ['Heads', 'Tails']
        const flipEmbed = new Discord.MessageEmbed()
        .setAuthor(`🎱 Your answer is: ${flipOptions[Math.floor(Math.random() * 2)]}`, msg.author.avatarURL({ dyamic: true, size: 256 }))
        .setColor(msg.guild.me.displayHexColor)

        msg.channel.send(flipEmbed)
    },
}