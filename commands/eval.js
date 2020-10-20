const Discord = require('discord.js')

module.exports = {
    name: 'eval',
    description: 'Executes javascript code. **OWNER ONLY**',
    usage: '<code>',
    args: true,
    guildOnly: true,
    ownerOnly: true,
    execute(msg, args) {
        var str = args.join(" ");
        var patt = new RegExp("token");
        var res = patt.test(str);
    
        if(res === true) return msg.reply("Invalid.")
    
        try {
            var code = args.join(" ");
            var evaled = eval(code);
    
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const evalEmbed = new Discord.MessageEmbed()
            .addField("Javascript Eval:", "Success!").addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```")
            .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
            .setColor(msg.guild.me.displayHexColor)

            msg.channel.send(evalEmbed)
        } catch (err){
            const errEmbed = new Discord.MessageEmbed()
            .addField("Javascript Eval ERROR:", "There was a problem with the code you're trying to run!")
            .addField("Error", "```" + clean(err) + "```")
            .setColor(msg.guild.me.displayHexColor)

            msg.channel.send(errEmbed)
        }
        
        function clean(text) {
            if (typeof(text) === "string")
                return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
    },
}