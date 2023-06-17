const { VoiceConnection, PlayerSubscription, AudioResource } = require('@discordjs/voice');

/**
 * @typedef {import('ytdl-core').MoreVideoDetails} MoreVideoDetails
 */

module.exports = {
  /**
   * @type {VoiceConnection | null}
   */
  channel: null,
  /**
   * @type {PlayerSubscription | null}
   */
  subscription: null,
  /**
   * @type {MoreVideoDetails | null}
   */
  videoInfo: null,
  /**
   * @type {AudioResource | null}
   */
  audio: null,
};
