const Discord = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

const client = new Discord.Client();

client.config = require('../config.json');
const { prefix, token } = client.config;

console.log('Inicializando o BOT...');

client.once('ready', () => {
  console.log('BOT está online!');
});

client.commands = new Discord.Collection();

console.log('Carregando todos os comandos...');
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(
  file => file.endsWith('.js') && !file.endsWith('.var.js')
);
for (file of commandFiles) {
  const commandName = file.split('.')[0];
  const command = require(`./commands/${file}`);
  client.commands.set(commandName, command);
  console.log(`Comando ${prefix}${commandName} carregado!`);
}
console.log('Todos os comandos foram carregados!');

client.on('message', async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === 'DM') {
    return;
  }

  const args = msg.content.trim().slice(prefix.length).split(/ +/g);
  const commandName = args.shift().toLowerCase();

  if (!commandName) {
    return await msg.reply(`Use: ${prefix}<comando>`);
  }

  const commandFunction = client.commands.get(commandName);
  if (commandFunction) {
    console.log(`Comando ${prefix}${commandName} executado!`);
    return commandFunction(client, msg, args);
  } else {
    await msg.reply('Comando não encontrado!');
  }
});

client.login(token);
