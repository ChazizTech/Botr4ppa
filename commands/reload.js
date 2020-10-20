const logger = require('beautiful-logs.js')

module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    aliases: ['rel'],
    args: true,
    ownerOnly: true,
    execute(msg, args) {
        const commandName = args[0].toLowerCase()
        const command = msg.client.commands.get(commandName)
            || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (!command) return msg.reply(`There is no command with name or alias \`${commandName}\`!`)

        delete require.cache[require.resolve(`./${command.name}.js`)]

        try {
            const newCommand = require(`./${command.name}.js`)
            msg.client.commands.set(newCommand.name, newCommand)
            msg.channel.send(`Command \`${command.name}\` was reloaded!`)
	        logger.command(`Botr4ppa command reloaded: ${command.name}`)
        } catch (error) {
            logger.err(error)
            msg.reply(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)
        }
    },
}
