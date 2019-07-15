const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of available commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a MD will all my commnands!');
                })
                .catch(derrpr => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\' not a valid command!');
        }

        /*
        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} seconds`);

        message.channel.send(data, {split: true});
        */

        const helpEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`${command.name}`)
            .setURL('https://discord.js.org/')
            .setAuthor('Chillbot Commands', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription(`${command.description}`)
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        if (command.aliases)  helpEmbed.addField('Aliases', `${command.aliases.join(', ')}`);
        if (command.usage)    helpEmbed.addField('Usage', `${command.usage}`);
        if (command.cooldown) helpEmbed.addField('Cooldown', `${command.cooldown}`);
        if (command.example)  helpEmbed.addField('Example', `${command.example}`);
        helpEmbed.setTimestamp();
        helpEmbed.setFooter('Chillbot Command Help.', 'https://i.imgur.com/wSTFkRM.png');

        message.channel.send(helpEmbed);
    }
};