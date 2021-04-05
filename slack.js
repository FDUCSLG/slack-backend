class slack {
  constructor(token, savePath = "./data", jsonspace = 0) {
    const fs = require("fs");
    console.log(savePath);
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath);
    }
    this.token = token;
    this.savePath = savePath;
    this.jsonspace = jsonspace;
    this.channelIds = {};
    const { WebClient, LogLevel } = require("@slack/web-api");
    this.client = new WebClient(token, {
      logLevel: LogLevel.DEBUG,
    });
  }
  // save slack workspace data
  async saveData() {
    await this.getChannelsList(); // get the channels list
    this.getUsersList(); // get the users list
    this.joinChannels(); // join all visible channels
    this.saveChannels(); // save channel messages and threads
  }
  // filter slack data for frontend usages
  filterForFrontend() {}
  // get channel name -> channel list map
  async getChannelsList() {
    const channelIds = {};
    const getChannelList = require("./src/getChannelList");
    const channels = await getChannelList(this.savePath, this.client);
    const fs = require("fs");
    fs.writeFileSync(
      `${this.savePath}/channels.json`,
      JSON.stringify(channels, null, this.jsonspace)
    );

    for (const channel of channels) {
      channelIds[channel.name] = channel.id;
    }
    this.channelIds = channelIds;
    fs.writeFileSync(
      `${this.savePath}/channels-list.json`,
      JSON.stringify(channels, null, this.jsonspace)
    );
  }
  // save users info
  getUsersList() {
    const getUserList = require("./src/getUserList");
    getUserList(this.client, this.savePath, this.jsonspace);
  }
  // join all channels listed in this.channelIds
  joinChannels() {
    const joinChannel = require("./src/joinChannel");
    for (const [channelName, channelId] of Object.entries(this.channelIds)) {
      joinChannel(channelId, this.client);
    }
  }
  // save channels data
  saveChannels() {
    const saveChannel = require("./src/saveChannel");
    for (const [channelName, channelId] of Object.entries(this.channelIds)) {
      saveChannel(channelName, channelId, this.client, this.savePath);
    }
  }
}

module.exports = slack;
