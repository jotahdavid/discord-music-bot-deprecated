const { Client, Message } = require('discord.js');
const connection = require('./connection.var.js');

/**
 * @param {Client} client
 * @param {Message} msg
 */
module.exports = async (client, msg) => {
  if (!connection.channel) {
    return await msg.reply('Eu não estou em um canal de voz, use: **!join**');
  }

  try {
    await msg.reply(':dash: Saindo...');
    await connection.channel.disconnect();
    connection.channel = null;
    if (connection.subscription) {
      await connection.subscription.destroy();
      connection.subscription = null;
    }
  } catch (e) {
    console.log('Não consegui sair da chamada', e);
  }
};
