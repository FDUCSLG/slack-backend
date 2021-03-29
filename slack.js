const { WebClient, LogLevel } = require("@slack/web-api");
const fs = require("fs");

const client = new WebClient(
  "xoxb-1316038385333-1913162831956-AN8YLgAIFumOFH5XEXBvvYr9",
  {
    logLevel: LogLevel.DEBUG,
  }
);
let channelIds = {
  "fducslg-build": "C019Q11RY49",
  general: "C0194KZD6P8",
  random: "C019HHJ7KAQ",
  share: "C01DQ1TEAAC",
  "sig-architecture": "C01ARFXJ2EL",
  "sig-compiler": "C01FPFF1CUU",
  "sig-crypto": "C01E6B4E0SG",
  "sig-distributed": "C01BV5JJQF7",
  "sig-efficiency": "C01FU5GKBAT",
  "sig-fdxk": "C01BHNM7K4Z",
  "sig-frontend": "C01K9UJTW3H",
  "sig-game-dev": "C01LWMRMKV4",
  "sig-graphics": "C01FS2C1SKC",
  "sig-networks": "C01DPAVKWCU",
  "sig-os": "C01BAUKNZ9S",
  "sig-xcpc": "C01R3GPP8F3",
  "wg-content": "C01G5NRSS8M",
  "wg-pafd-bot": "C01CLF5BENL",
  "wg-slack-bot": "C01M9DUQ6UA",
};

async function saveConversationHistory(channelId, savePath, limit = 100000) {
  try {
    const result = await client.conversations.history({
      channel: channelId,
      limit,
    });
    const history = result.messages;
    const threads = [];
    console.log(`${history.length} messages found in ${channelId}`);
    fs.writeFileSync(savePath, JSON.stringify(history, null, 2));
    console.log(`history saved to: ${savePath}`);
    for (message of history) {
      threads.push(message.ts);
    }
    return threads;
  } catch (err) {
    console.error(err);
  }
}

async function getThreadHistory(channelId, ts, limit = 100000) {
  try {
    const result = await client.conversations.replies({
      channel: channelId,
      ts,
    });

    history = result.messages;
    console.log(`{history.length} replies found in thread ${ts}`);
    return history;
  } catch (err) {
    console.error(err);
  }
}

async function saveChannel(channelName) {
  if (!fs.existsSync(`./${channelName}`)) {
    fs.mkdirSync(`./${channelName}`);
  }
  const channelId = channelIds[channelName];
  const tss = await saveConversationHistory(
    channelId,
    `./${channelName}/${channelName}.json`
  );
  // concat threads
  let count = 0;
  const fetchThreads = async (ts) => {
    let history;
    if (count !== 0 && count % 50 == 0) {
      console.log("Reach 50 per minute limit, sleeping");
      setTimeout(async () => {
        history = await getThreadHistory(channelId, ts);
      }, 6000);
    } else {
      history = await getThreadHistory(channelId, ts);
    }
    count++;
    return history;
  };
  const threads = [];
  for (ts of tss) {
    const threadMessages = await fetchThreads(ts);
    threads.push({
      [ts]: threadMessages,
    });
  }
  fs.writeFileSync(
    `./${channelName}/${channelName}-threads.json`,
    JSON.stringify(threads, null, 2)
  );
}

//for (const [channelName, channelId] of Object.entries(channelIds)) {
//saveConversationHistory(channelId, `./${channelName}.json`);
//}
saveChannel("random");
