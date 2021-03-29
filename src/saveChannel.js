const fs = require("fs");
const conversationClient = require("./api/conversation");

// save a channel's messages
async function saveChannel(channelName, channelId, client) {
  // mkdir for data
  if (!fs.existsSync(`./data/${channelName}`)) {
    fs.mkdirSync(`./data/${channelName}`, { recursive: true });
  }
  const converseClient = new conversationClient(client);
  const tss = []; // timestamps for messages
  const threads = []; // threads data
  const messages = await converseClient.getHistory(channelId);
  // save channel messages
  fs.writeFileSync(
    `./data/${channelName}/${channelName}.json`,
    JSON.stringify(messages, null, 2)
  );

  // ------------

  let count = 0;
  const fetchThreads = async (ts) => {
    let history;
    if (count !== 0 && count % 50 == 0) {
      console.log("Reach 50 per minute limit, sleeping");
      setTimeout(async () => {
        history = await converseClient.getReplies(channelId, ts);
      }, 6000);
    } else {
      history = await converseClient.getReplies(channelId, ts);
    }
    count++;
    return history;
  };

  // get all the messages' timestamp and use this to get threads data
  for (const message of messages) {
    tss.push(message.ts);
  }
  for (const ts of tss) {
    const threadMessages = await fetchThreads(ts);
    threads.push({
      [ts]: threadMessages,
    });
  }
  // save threads
  fs.writeFileSync(
    `./data/${channelName}/${channelName}-threads.json`,
    JSON.stringify(threads, null, 2)
  );
}

module.exports = saveChannel;
