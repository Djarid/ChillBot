module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    guildOnly: true,
    args: true,
    usage: '<user>',
    example: '!kick @Djarid',
    execute(message, args) {
        var taggedUser = message.mentions.users.first();
        message.channel.send(`${message.author} wants to kick ${taggedUser.username}`);
    }
}