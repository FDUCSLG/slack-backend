const { WebClient, LogLevel } = require("@slack/web-api");
const fs = require("fs");
const token = "xoxb-1316038385333-1913162831956-7maVHnmxauQ6A5DyIbuP3iJf";
const conversationClient = require("./src/api/conversation");
const usersClient = require("./src/api/users");

const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});

const channelIds = {
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

const saveChannel = require("./src/saveChannel");
saveChannel("general", channelIds["general"], client);
