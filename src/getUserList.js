const usersClient = require("./api/users");
const fs = require("fs");

async function getUserList(client, savePath = "./data") {
  const userCli = new usersClient(client);
  const usersList = await userCli.getUsersList();
  fs.writeFileSync(`${savePath}/users-list.json`);
}

module.exports = getUserList();
