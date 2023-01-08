const { Client, Message } = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {string[]} args
 */
module.exports = async (client, msg) => {
  const formattedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(msg.guild.createdAt));
  await msg.reply(`O servidor foi criado em: **${formattedDate}**`);
};
