const { Client, Message } = require('discord.js');
const {
  createAudioResource,
  createAudioPlayer,
  AudioPlayerStatus,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

const connection = require('./connection.var.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {string[]} args
 */
module.exports = async (client, msg, args) => {
  if (!connection.channel) {
    return await msg.reply('Eu não estou em um canal de voz, use: **!join**');
  }

  if (args.length === 0) {
    return await msg.reply(
      'Você precisa enviar o link ou nome da música: **!play <link/nome>**'
    );
  }

  try {
    const searchResults = (await ytsr(args.join(' '), { limit: 5 })).items;
    const videoLink = searchResults.find(
      (video) => video.type === 'video' && !video.badges.includes('LIVE')
    )?.url;

    if (!ytdl.validateURL(videoLink)) {
      return await msg.reply(
        ':red_circle: Link inválido! Envie um link de um vídeo do YouTube: !play <link>'
      );
    }

    const stream = ytdl(videoLink, { filter: 'audioonly' });
    const videoInfo = (await ytdl.getBasicInfo(videoLink)).videoDetails;

    const player = createAudioPlayer();
    const audio = createAudioResource(stream);

    connection.dispatcher = connection.channel.subscribe(player);
    connection.dispatcher.player.play(audio);

    await msg.channel.send(
      `:arrow_forward: Reproduzindo: **${videoInfo.title}**\n` +
      videoLink
    );

    connection.dispatcher.player.on(AudioPlayerStatus.Idle, async () => {
      await msg.channel.send('**:white_check_mark:  A música acabou!**');
    });
  } catch (e) {
    console.log('Não consegui reproduzir a música', e);
    await msg.reply(':red_circle: Não consegui reproduzir a música');
  }
};
