#! /usr/bin/env node

const yargs = require('yargs')
const wtm = require('./index')

const opt = yargs
  .usage("\x1b[32mUsage: 'cMark <Folder Path> -t <Your Title>'\x1b[0m")
  .option('title', {
    alias: 't',
    describe: 'Gallery Title',
    type: 'string',
    demandOption: true
  })
  .argv

const path = opt._[0]
const title = opt.t

if (path != undefined) {
  wtm(path, config, title)
} else {
  console.log('\x1b[31m%s\x1b[0m', 'System Error: invalid folder path')
}
