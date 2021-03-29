const conversationClient = require("./api/conversation");
//
// invite users to a channel
function invite(channelId, users, client) {
  new conversationClient(client).invite(channelId, users, client);
}

module.exports = invite;
