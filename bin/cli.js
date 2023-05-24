#! /usr/bin/env node

const yargs = require('yargs');
// let ty = require('./index')

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

const a = opt._[0];

if (a != undefined) {
  
} else {
  console.log('\x1b[31m', 'System Error: invalid folder path');
}