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
  async getReplies(channelId, ts, limit = 10000) {
    try {
      const res = await this.client.conversations.replies({
        channel: channelId,
        ts,
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
}

module.exports = conversationClient;
