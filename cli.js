#!/usr/bin/env node
const slack = require("./slack");
const { Command } = require("commander");
const cli = new Command();

cli.version("0.1.0");
cli.requiredOption("-t, --token <token>", "token for the slack app");
cli.option("-p, --path <path>", "save folder path for data, default: ./data ");
cli.option("--jsonspace <space>", "saved json space");
cli.option("-s, --start", "start saving channel messages");
cli.parse();

const options = cli.opts();
const sl = new slack(options.token, options.path, options.jsonspace);
if (options.start) {
  sl.saveData();
}
