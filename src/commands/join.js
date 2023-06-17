const { Client, Message } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
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
    if (connection.channel.joinConfig.channelId === msg.member.voice.channelId) {
      return await msg.reply(
        `Eu já estou no canal, para tocar música use: **${client.config.prefix}play <link>**`
      );
    }

    connection.channel.disconnect();
    connection.channel = null;
  }

  try {
    await msg.reply(':person_running: Entrando...');
    connection.channel = joinVoiceChannel({
      channelId: msg.member.voice.channelId,
      guildId: msg.guildId,
      adapterCreator: msg.guild.voiceAdapterCreator,
      selfDeaf: true,
    });
  } catch (err) {
    console.error(err);
    await msg.reply(':red_circle: Não consegui entrar no canal de voz');
  }
};
