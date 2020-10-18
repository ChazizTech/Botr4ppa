module.exports = {
    name: 'ping',
    description: 'Gives you the ping of the bot.',
    execute(msg) {
        msg.channel.send("Pong!")  
    },
}