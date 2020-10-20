const Discord = require('discord.js')

module.exports = {
    name: 'message',
    description: 'Sends a message to specified user.',
    usage: '<@user> <message>',
    aliases: ['msg'],
    args: true,
    guildOnly: true,
    execute(msg, args) {
        let sentmessage = args.splice(1).join(' ');
        let user = msg.mentions.users.first();
        if (msg.mentions.users.size < 1) return msg.channel.sendMessage("You must mention the user you are going to message.").catch(console.error);
        if (msg.length < 1) return msg.channel.sendMessage('Please enter a message.');
        const embed = new Discord.MessageEmbed()
        .setAuthor("You have been sent a message!", msg.author.avatarURL)
        .setDescription(`${msg.author.tag} has sent you a private message!`)
        .addField("User", msg.author.tag)
        .addField("Message", sentmessage)
        .setFooter("How to send a message back. Go to any sever that has this same person and do b4!message <@user> <message>")
        .setColor(msg.guild.me.displayHexColor)

        user.send(embed).then(msg.channel.send("Message Sent!"))
    }
}
