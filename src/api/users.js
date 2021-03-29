class usersClient {
  constructor(client) {
    this.client = client;
  }
  async getInfo(userId) {
    try {
      const res = await this.client.users.info({
        user: userId,
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = usersClient;
