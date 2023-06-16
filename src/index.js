const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
} = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

try {
  client.config = require('../config.json');
} catch (err) {
  throw new Error('config.json is empty or missing in root folder');
}

const { prefix, token } = client.config;

if (!token) {
  throw new Error('token is missing in config.json file');
}
if (!prefix) {
  throw new Error('prefix is missing in config.json file');
}

console.log('Inicializando o BOT...');

client.once(Events.ClientReady, () => {
  console.log('BOT está online!');
});

client.commands = new Collection();

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

client.on(Events.MessageCreate, async (msg) => {
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

function handleProcessEnd() {
  console.log('\nDesligando o BOT...');
  client.destroy();
  process.off('exit', handleProcessEnd);
  process.exit();
}

process.on('SIGINT', handleProcessEnd);
process.on('exit', handleProcessEnd);
