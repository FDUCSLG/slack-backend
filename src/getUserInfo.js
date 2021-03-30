const usersClient = require("./api/users");
const fs = require("fs");

async function getUserInfo(client, savePath = "./data") {
  const userCli = new usersClient(client);
  const usersList = await userCli.getUsersList();
  fs.writeFileSync(`${savePath}/usersList.json`);
}

module.exports = getUserInfo();
