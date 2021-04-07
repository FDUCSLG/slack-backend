const conversationClient = require("./api/conversation")

//
async function joinChannel(
    channelId,
    client
) {
  try {
    const resp = await new conversationClient(client).joinChannel(channelId);
    console.log(resp)
  } catch (err) {
    console.error(err);
  }
}

module.exports = joinChannel;
