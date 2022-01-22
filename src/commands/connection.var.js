const { VoiceConnection, StreamDispatcher } = require('discord.js');

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
