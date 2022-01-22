const { Client, Message } = require('discord.js');
const connection = require('./connection.var.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {string[]} args
 */
module.exports = async (client, msg, args) => {
  if (!msg.member.voice.channel) {
    return await msg.reply('Você não está em um canal de voz!');
  }

  if (connection.channel) {
    if (connection.channel.voice.channelID === msg.member.voice.channelID) {
      return await msg.reply('Eu já estou no canal, para tocar música use: **!play <link>**');
    }

    await connection.channel.disconnect();
    connection.channel = null;
  }

  await msg.reply(':person_running: Entrando...');
  connection.channel = await msg.member.voice.channel.join();
  await connection.channel.voice.setSelfDeaf(true);
};
