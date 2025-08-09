#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs");
const inquirer = require("inquirer");
const spawn = require('cross-spawn');

const Platform = ["Bun", "Deno", "Node"];

async function startPrompt() {
    const prompt = inquirer.createPromptModule();
    const answer = await prompt([
        {
            name: "projectName",
            type: "input",
            message: "Project Name:",
            default: "floq-app",
        },
        {
            name: "runtime",
            type: "select",
            choices: Platform,
            default: "Deno",
            message: "Choose your runtime:",
        },
    ]);
    return answer;
}

function createProjectDir(config) {
    // Create the project dir if it doesn't exist already
    const projectDir = path.resolve(process.cwd(), config.projectName);
    fs.mkdirSync(projectDir, { recursive: true });

    if (config.runtime === "Deno") {
        // Copy floq main file
        const templateDir = path.resolve(__dirname, "floq", "deno");
        const targetDir = path.resolve(projectDir, "floq");
        fs.cpSync(templateDir, targetDir, { recursive: true });

        // Copy deno.json
        const denoJsonPath = path.resolve(__dirname, "floq", "deno.json")
        const projectDenoJson = require(denoJsonPath);
        projectDenoJson.name = config.projectName;
        fs.writeFileSync(
            path.join(projectDir, "deno.json"),
            JSON.stringify(projectDenoJson, null, 2)
        )

        // Move to projectDir and install packages
        process.chdir(path.resolve(projectDir))
        // Install packages
        spawn.sync('deno', ['install']);
        // Run lifecyle scripts
        spawn.sync('deno', ['task', 'postinstall'], { stdio: 'inherit'});
    } else if (config.runtime === "Node") {
        // Copy floq main file
        const templateDir = path.resolve(__dirname, "floq", "node");
        const targetDir = path.resolve(projectDir, "floq");
        fs.cpSync(templateDir, targetDir, { recursive: true });

        // Copy package.json 
        const nodePackageJsonPath = path.resolve(__dirname, "floq", "package-node.json")
        const projectPackageJson = require(nodePackageJsonPath);
        projectPackageJson.name = config.projectName;
        fs.writeFileSync(
            path.join(projectDir, "package.json"),
            JSON.stringify(projectPackageJson, null, 2)
        )
    }

    // Copy the gitignore file
    fs.copyFileSync(
        path.join(path.resolve(__dirname), "gitignore"),
        path.join(projectDir, ".gitignore"),
    );
}

async function createFloqApp() {
    const promptConfig = await startPrompt();
    createProjectDir(promptConfig);
}

createFloqApp();
