#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

yargs()
    .scriptName("floq")
    .usage('$0 <cmd> [args]')
    .command('dev [name]', 'welcome ter yargs!', (yargs) => {
        yargs.option('name', {
            type: 'string',
            default: 'Port',
            describe: 'the name to say hello to',

        })
    }, function (argv) {
        console.log('hello', argv.name, 'Starting local dev server!')
    })
    .command('deploy [name]', 'welcome ter yargs!', (yargs) => {
        yargs.option('name', {
            type: 'string',
            default: 'Port',
            describe: 'the name to say hello to',

        })
    }, function (argv) {
        console.log('hello', argv.name, 'Deploying to custom cloud!')
    })
    .help()
    .parse(hideBin(process.argv))
