const Discord = require('discord.js')

module.exports = {
    name: '8ball',
    description: 'Its an eight ball, thats it..',
    usage: '<question>',
    aliases: ['eightball'],
    args: true,
    guildOnly: true,
    execute(msg, args) {
        const responses = ["nope.avi", "yes.wav", "Yes", "No", "Hell Yeah!", "It is certain", "What do you think? Because it's a no..", "Maybe", "Never", "Yep", "In the future", "Well I can't think right now", "Nah", "no u", "Sorry, but what do you mean?"]
        const eightballEmbed = new Discord.MessageEmbed()
        .setAuthor(`🎱 Your answer is: ${responses[Math.floor(Math.random() * responses.length)]}`, msg.author.avatarURL({ dyamic: true, size: 256 }))
        .setColor(msg.guild.me.displayHexColor)

        msg.channel.send(eightballEmbed)
    },
}