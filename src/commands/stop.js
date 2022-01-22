const { Client, Message } = require('discord.js');
const connection = require('./connection.var.js');

/**
 * @param {Client} client
 * @param {Message} msg
 */
module.exports = async (client, msg) => {
  if (!connection.dispatcher) {
    return await msg.reply('Eu não estou tocando nada, use: **!play <link>**');
  }

  try {
    await msg.channel.send('**:stop_button: A música parou!**');
    connection.dispatcher.destroy();
    connection.dispatcher = null;
  } catch (e) {
    console.log('Não consegui para de tocar a música', e);
  }
};
