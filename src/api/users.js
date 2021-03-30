class usersClient {
  constructor(client) {
    this.client = client;
  }
  async getInfo(userId) {
    try {
      const res = await this.client.users.info({
        user: userId,
      });
      return res.user;
    } catch (err) {
      console.error(err);
    }
  }
  // get a list of all users in a slack team
  // https://api.slack.com/methods/users.list
  async getUsersList() {
    try {
      const res = await this.client.users.list();
      return res.members;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = usersClient;
