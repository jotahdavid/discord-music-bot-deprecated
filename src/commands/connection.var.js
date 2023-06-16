const { VoiceConnection, PlayerSubscription } = require('@discordjs/voice');

module.exports = {
  /**
   * @type {VoiceConnection | null}
   */
  channel: null,
  /**
   * @type {PlayerSubscription | null}
   */
  dispatcher: null
};
