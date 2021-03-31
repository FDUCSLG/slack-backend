const usersClient = require("./api/users");
const fs = require("fs");

async function getUserList(client, savePath = "./data", jsonspace = 0) {
  const userCli = new usersClient(client);
  const usersList = await userCli.getUsersList();
  fs.writeFileSync(
    `${savePath}/users-list.json`,
    JSON.stringify(usersList, null, jsonspace)
  );
  return usersList;
}

module.exports = getUserList;
