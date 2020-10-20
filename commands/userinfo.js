const Discord = require('discord.js')

module.exports = {
    name: 'userinfo',
    description: 'Gives information about a user.',
    usage: '[@user]',
    aliases: ['memberinfo', 'ui'],
    guildOnly: true,
    execute(msg) {
        let user = msg.mentions.users.first()
        if (user != undefined) {
            const mentionEmbed = new Discord.MessageEmbed()
            .setAuthor(`Info - ${user.username}`, user.avatarURL({ dynamic: true, size: 256 }))
            .setColor(msg.guild.me.displayHexColor)
            .addField("Date Created", user.createdAt, false)
            .addField("Username", user.username, false)
            .addField("Discriminator", user.discriminator, false)
            .addField("ID", user.id, false)
            .addField(`Bot`, user.bot === true ? `Yes` : `No`, false)

            msg.channel.send(mentionEmbed)
        }
        if (user == undefined) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Info - ${msg.author.username}`, msg.author.avatarURL({ dynamic: true, size: 256 }))
            .setColor(msg.guild.me.displayHexColor)
            .addField("Date Created", msg.author.createdAt, false)
            .addField("Username", msg.author.username, false)
            .addField("Discriminator", msg.author.discriminator, false)
            .addField("ID", msg.author.id, false)
            .addField(`Bot`, msg.author.bot === true ? `Yes` : `No`, false)

            msg.channel.send(embed)
        }
    }
}