


### Slack-backend

Backup Slack channel messages and save as json.

#### How to use

1. install an app to your workspace and get the **token**
2. give the app enough OAuth scope (see https://api.slack.com)
  - `channels:join`: required by `conversations.join`
3. invite the app to all channels (`/invite @yourappname`)
4. use the cli of this program

##### Examples

```bash
yarn cli -t xoxb-1316038385333-1913162831956-h26hXK6WJ7g3UuXuTF2GVIqp -s
```

**Explanation**: You may use the cli directly by `node cli.js` or use npm `npm run cli ...`. `-t` means token for the app, `-s` means start. Then the program will start to get data and save them to the `data` folder

### TODOS

- [x] write cli program
- [x] install the app by admin
- [ ] get **unit test**
- [ ] rewrite in **typescript**
- [ ] test whether a message has reply and fetch threads depending on that
- [ ] fix message **ts** issue (how to calculate)
- [ ] pagination and timed backup for data
- [ ] filter data for frontend

### Usage

When [creating a slack app](https://api.slack.com/apps?new_app=1), those scopes are needed: `channels:join` and all `history` scope.

