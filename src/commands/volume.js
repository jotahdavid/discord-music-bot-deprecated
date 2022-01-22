const { Client, Message } = require('discord.js');
const connection = require('./connection.var.js');

/**
 * @param {Client} client 
 * @param {Message} msg 
 * @param {string[]} args 
 */
module.exports = async (client, msg, args) => {
  if (!connection.dispatcher) {
    return await msg.reply('Eu não estou tocando nada, use: **!play <link>**');
  }

  const volume = Number(args[0]);

  if (volume !== 0 && !volume) {
    return await msg.reply('Você precisa enviar o volume que deseja: **!volume <valor>**');
  }

  if (volume < 0) {
    return await msg.reply('O valor do volume precisa ser igual ou maior que 0');
  }

  try {
    const soundEmoji = connection.dispatcher.volume > volume ? ':sound:' : ':loud_sound:';
    await msg.channel.send(`${soundEmoji} Volume setado para ${volume}`);
    connection.dispatcher.setVolume(volume);
  } catch (e) {
    console.log('Não consegui trocar o volume da música', e);
  }
};
