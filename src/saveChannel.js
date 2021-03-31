const fs = require("fs");
const conversationClient = require("./api/conversation");

// save a channel's messages
async function saveChannel(
  channelName,
  channelId,
  client,
  savePath = "./data"
) {
  // mkdir for data
  if (!fs.existsSync(`${savePath}/${channelName}`)) {
    fs.mkdirSync(`${savePath}/${channelName}`, { recursive: true });
  }
  console.log("RUNNING");
  const converseClient = new conversationClient(client);
  const tss = []; // timestamps for messages
  const threads = []; // threads data
  const messages = await converseClient.getHistory(channelId);
  // save channel messages
  console.log("Writing messages ...");
  if (!fs.existsSync(`${savePath}/${channelName}/${channelName}.json`)) {
    fs.writeFileSync(
      `${savePath}/${channelName}/${channelName}.json`,
      JSON.stringify(messages, null, 2)
    );
  } else {
    //  concatenate file
    let json = fs.readFileSync(
      `${savePath}/${channelName}/${channelName}.json`
    );
    const index = messages.findIndex((mes) => {
      return mes.ts === json[0].ts;
    });
    json = messages.slice(0, index).concat(json);
    fs.writeFileSync(
      `${savePath}/${channelName}/${channelName}.json`,
      JSON.stringify(json, null, 2)
    );
  }
  console.log("Finished writing messages");

  // ------------

  let count = 0;
  const fetchThreads = async (ts) => {
    let history;
    if (count !== 0 && count % 50 == 0) {
      console.log("Reach 50 per minute limit, sleeping");
      setTimeout(async () => {
        history = await converseClient.getReplies(channelId, ts);
      }, 60000);
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
      ts: ts,
      threads: threadMessages,
    });
  }
  // save threads
  console.log("Writing threads ...");
  if (
    !fs.existsSync(`${savePath}/${channelName}/${channelName}-threads.json`)
  ) {
    fs.writeFileSync(
      `${savePath}/${channelName}/${channelName}-threads.json`,
      JSON.stringify(threads, null, 2)
    );
  } else {
    // TODO: concatenate file
    // fetch only after by the latest
  }
  console.log("Finished writing threads");
}

module.exports = saveChannel;
