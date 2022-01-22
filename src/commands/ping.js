const { Client, Message } = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 */
module.exports = async (client, msg) => {
  const botMessage = await msg.channel.send(`Pong!`);
  return await botMessage.edit(`Ping: **${msg.createdTimestamp - botMessage.createdTimestamp}ms**`);
};
