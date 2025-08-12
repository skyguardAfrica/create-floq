#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const spawn = require("cross-spawn");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

function isFloqProject() {
	// Check if floq.json exists (marks this as floq project)
	const currentDir = process.cwd();
	const floqJsonPath = path.resolve(currentDir, 'floq.json');
	if (!fs.existsSync(floqJsonPath)) {
		return false;
	}
	const floqJson = require(floqJsonPath);
	if (!floqJson.name || !floqJson.runtime) {
		return false;
	}
	// Check if index file to run backend server exists (to pick the correct runtime)
	const floqRuntime = floqJson.runtime;
	let floqIndex;
	if (floqRuntime === 'Deno') {
		floqIndex = path.resolve(currentDir, 'floq', 'index.ts');
	} else if (floqRuntime === "Javascript") {
		floqIndex = path.resolve(currentDir, 'floq', 'index.js');
	} else {
		return false;
	}

	if (fs.existsSync(floqIndex)) {
		return true;
	} else {
		return false;
	}
}

function runDevServer() {
	// Check if current folder has a valid floq project to initialize in dev mode
	if (!isFloqProject()) {
		console.log("This is not a floq app/project\nRun npm create floq@latest to initialize the project");
		return false;
	} 
	const currentDir = process.cwd();
	const floqJsonPath = path.resolve(currentDir, 'floq.json');
	const floqJson = require(floqJsonPath);
	if (floqJson.runtime === "Deno") {
		spawn.sync("deno", ["task", "floq-dev"], { stdio: "inherit"});
	} else {
		spawn.sync("npm", ["run", "floq-dev"], { stdio: "inherit"});
	}
}

function deployApp() {

}

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
		console.log('hello', argv.name, 'Starting local dev server!');
		runDevServer();
	})
	.command('deploy [name]', 'welcome ter yargs!', (yargs) => {
		yargs.option('name', {
			type: 'string',
			default: 'Port',
			describe: 'the name to say hello to',

		})
	}, function (argv) {
		console.log('hello', argv.name, 'Deploying to custom cloud!')
		deployApp();
	})
	.help()
	.parse(hideBin(process.argv))
