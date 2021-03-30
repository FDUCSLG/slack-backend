const converseClient = require("./api/conversation");
const fs = require("fs");

// get the list for channels in a workspace
async function getChannelList(savePath, client) {
  const { channels } = await new converseClient(client).getList();
  fs.writeFileSync(savePath, JSON.stringify(channels, null, 2));
  return channels;
}

module.exports = getChannelList;
