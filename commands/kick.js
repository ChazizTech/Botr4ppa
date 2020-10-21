const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    usage: '<@user> <reason>',
    args: true,
    guildOnly: true,
    cooldown: 2.5,
    execute(msg, args) {
        let mentionedUser = msg.mentions.users.first();
        let reason = args.splice(1).join(' ')
        let botPerm = msg.guild.me.hasPermission('KICK_MEMBERS')
        let userPerm = msg.guild.member(msg.author).hasPermission('KICK_MEMBERS')

        if(msg.mentions.users.size < 1) return msg.reply('You didn\'t specify anyone to kick!')
        if(reason.length < 1) return msg.reply('You didn\'t specify a reason for the kick!')
        if(!botPerm) return msg.reply('I don\'t have the permission `KICK MEMBERS`')
        if(!userPerm) return msg.reply('You don\'t have the permission `KICK MEMBERS`')
        if(!msg.guild.member(mentionedUser).kickable) return msg.reply('I cannot kick this person!')

        msg.guild.member(mentionedUser).kick(reason)
        msg.channel.send(`I have kicked ${mentionedUser} with the reason of ${reason}.`)
        mentionedUser.send(`You have been kicked from ${msg.guild.name} with the reason of ${reason}.`)
    },
}