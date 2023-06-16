const { VoiceConnection } = require('@discordjs/voice');
const { StreamDispatcher } = require('discord.js');

module.exports = {
  /**
   * @type {VoiceConnection | null}
   */
  channel: null,
  /**
   * @type {StreamDispatcher | null}
   */
  dispatcher: null
};
