const Discord = require('discord.js')

module.exports = {
    name: 'say',
    description: 'Will make the bot say what you want it to say.',
    usage: '<message>',
    args: true,
    guildOnly: true,
    execute(msg, args) {
        const embed = new Discord.MessageEmbed()
        .setDescription(args.join(" "))
        .setColor(msg.guild.me.displayHexColor)

        msg.channel.send(embed)
    },
}