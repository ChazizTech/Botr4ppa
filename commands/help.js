const { prefix } = require('../botsettings')

module.exports = {
    name: 'help',
    description: 'Lists all commands, or gives specific information about a command.',
    aliases: ['commands', 'cmds'],
    usage: '[command name]',
    cooldown: 5,
    execute(msg, args) {
        const data = []
        const { commands } = msg.client

        if (!args.length) {
            data.push('Here\'s a list of all my commands:')
            data.push(commands.map(command => command.name).join(', '))
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`)

            return msg.author.send(data, { split: true })
                .then(() => {
                    if (msg.channel.type === 'dm') return;
                    msg.reply("I've sent you a DM with all my commands!")
                })
                .catch(error => {
                    console.error(`Couldn't send help DM to ${msg.author.tag}.\n`, error)
                    msg.reply('It seems like I can\'t DM you, do you have DMs disabled?')
                })
        }

        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

        if (!command) return msg.reply("That's not a valid command!")

        data.push(`**Name:** ${command.name}`)
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
        if (command.description) data.push(`**Description:** ${command.description}`)
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

        msg.channel.send(data, { split: true })
    },
}