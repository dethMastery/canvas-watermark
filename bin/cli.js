#! /usr/bin/env node

const yargs = require('yargs');
let cMark = require('./index')

const opt = yargs
    .usage(
        "\x1b[32mUsage: 'cMark' or 'cMark -c <Your Custom Config>'\x1b[0m"
    )
    .option("config", {
        alias: 'c',
        describe: "Add Watermark config",
        type: "string",
        demandOption: false
    })
    .argv;

const path = opt._[0];
const config = opt.c

if (path != undefined) {
  cMark(path, config)
} else {
  console.log('\x1b[31m%s\x1b[0m', 'System Error: invalid folder path');
}