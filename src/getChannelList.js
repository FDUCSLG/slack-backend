const converseClient = require("./api/conversation");

// get the list for channels in a workspace
async function getChannelList(savePath, client) {
  try {
    const resp = await new converseClient(client).getList();
    return resp.channels;
  } catch (err) {
    console.error(err);
  }
}

module.exports = getChannelList;
