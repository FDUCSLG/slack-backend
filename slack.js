class slack {
  constructor(token, savePath = "./data", jsonspace = 0) {
    const { WebClient, LogLevel } = require("@slack/web-api");
    this.token = token;
    this.savePath = savePath;
    this.jsonspace = jsonspace;
    this.client = new WebClient(token, {
      logLevel: LogLevel.DEBUG,
    });
  }
  // save slack workspace data
  saveData() {
    this.getChannelsList(); // get the channels list
    this.getUsersList(); // get the users list
    this.saveChannels(); // save channel messages and threads
  }
  // filter slack data for frontend usages
  filterForFrontend() {}
  // get channel name -> channel list map
  async getChannelsList() {
    const channelIds = {};
    const getChannelList = require("./src/getChannelList");
    const channels = await getChannelList(this.savePath);
    for (const channel of channels) {
      channelIds[channel.name] = channel.id;
    }
    this.channelIds = channelIds;
    const fs = require("fs");
    fs.writeFileSync(
      `${this.savePath}/channels-list.json`,
      JSON.stringify(channels, null, this.jsonspace)
    );
  }
  // save users info
  getUsersList() {
    const getUserList = require("./src/getUserList");
    getUserList(this.client, this.savePath);
  }
  // save channels data
  saveChannels() {
    const saveChannel = require("./src/saveChannel");
    for (const [channelName, channelId] of this.channelIds) {
      saveChannel(channelName, channelId, this.client, this.savePath);
    }
  }
}

const token = "xoxb-1316038385333-1913162831956-5Bn0NDTQH7pd8Mpgdjmy2SH8";
module.exports = slack;
