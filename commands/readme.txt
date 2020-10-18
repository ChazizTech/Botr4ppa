To make a command start the file with this

module.exports = {
    name: 'commandname',
    description: 'Command description',
<<<<<<< Updated upstream
    execute(msg, args) {
=======
    execute(msg) {
>>>>>>> Stashed changes
        // Code goes here for command
    },
}