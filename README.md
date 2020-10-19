# Botr4ppaJS

This is the command structure below, to make a command put it in the commands folder and name it `commandname.js`

```js
module.exports = {
    name: 'commandname', // REQUIRED
    description: 'Command description', // REQUIRED
    guildOnly: true/false, // Optional
    cooldown: 5, // In seconds, Optional
    args: true/false, // Optional, unless the command REQUIRES TEXT ARGUMENTS
    usage: '[reason]', // Optional
    aliases: ['alias1', 'alias2', 'etc..'], //Optional
    ownerOnly: true, //Optional
    execute(msg, args) { //REQUIRED
        // Code goes here for command
    },
}
```
