# Botr4ppaJS

This is the command structure below, to make a command put it in the commands folder and name it `commandname.js`

```js
module.exports = {
    name: 'commandname',
    description: 'Command description',
    guildOnly: true/false,
    cooldown: 5, // In seconds
    args: true/false,
    usage: '[reason]',
    aliases: ['alias1', 'alias2', 'etc..'],
    execute(msg, args) {
        // Code goes here for command
    },
}
```
