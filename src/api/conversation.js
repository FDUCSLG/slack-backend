class conversationClient {
  constructor(client) {
    this.client = client;
  }
  // list all channels in a slack team
  // https://api.slack.com/methods/conversations.list
  async getList() {
    try {
      const res = await this.client.conversations.list();
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async getHistory(channelId, limit = 10000) {
    try {
      const result = await this.client.conversations.history({
        channel: channelId,
        limit,
      });
      const history = result.messages;
      return history;
    } catch (err) {
      console.error(err);
    }
  }
  // retrieve a thread of messages posted to a conversation [tier 3]
  // https://api.slack.com/methods/conversations.replies
  async getReplies(channelId, ts, limit = 10000) {
    try {
      const res = await this.client.conversations.replies({
        channel: channelId,
        ts,
        limit,
      });
      const history = res.messages;
      return history;
    } catch (err) {
      console.error(err);
    }
  }
  // invite users to a channel
  // https://api.slack.com/methods/conversations.invite
  async invite(channelId, users) {
    try {
      const res = await this.client.conversations.invite({
        channel: channelId,
        users,
      });
    } catch (err) {
      console.error(err);
    }
  }
  // join this app to a channel
  // https://api.slack.com/methods/conversations.join
  async joinChannel(channelId) {
    try {
      const res = await this.client.conversations.join({
        channel: channelId,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = conversationClient;
