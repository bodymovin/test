const core = require('@actions/core');
const github = require('@actions/github');
const {readdir, readFile, writeFile} = require('fs/promises');
const path = require('path');

const editFile = async (filePath, player, version) => {
  const file = await readFile(filePath, 'utf-8');
  const fileData = JSON.parse(file);
  if (!fileData.stats[player]) {
    throw new Error('Player does not exist');
  }
  const playerStats = fileData.stats[player];
  const objKeys = Object.keys(playerStats)
  fileData.stats[player][version] = playerStats[objKeys[objKeys.length - 1]];
  const updateFileString = JSON.stringify(fileData, null, 2);
  return await writeFile(filePath, updateFileString);
}

async function updateFiles(player, version) {
  const dirPath = path.join(process.env.GITHUB_WORKSPACE || './', 'data');
  try {
    const data = (await readdir(
      dirPath
    )).map(fileName => `${dirPath}/${fileName}`)
    // console.log(data)
    await Promise.all(
      data.map(async (filePath) => {
        return editFile(filePath, player, version)
      })
    )
  } catch(error) {
    console.log('readFiles error');
    console.log(error);
  }
}

const getPlayerData = async(issueBody) => {
  var split = issueBody.split('\r\n');
  console.log(split);
  const keys = split.reduce((dict, value) => {
    const keyValue = value.split(':')
    dict[keyValue[0].trim()] = keyValue[1].trim();
    return dict;
  }, {})

  return keys;
}

const setBranchName = async(playerData) => {
  const branchName = `${playerData.player}__${playerData.version}`
  core.setOutput("branch_name", branchName);
  core.setOutput("branch_name_pr", `${branchName}_pr`);
}

async function run() {
  try {
    if (!github.context.payload.issue) {
      github.context.payload.issue = {
        title: 'New version',
        body: `player: lottie-web
version:5.9.2`
      }
    }
    // Issue title: github.context.payload.event.issue.title
    // Issue body: github.context.payload.event.issue.body
    const issue = github.context.payload.issue;
    if (issue.title.toLowerCase() !== 'new version') {
      // return;
    }
    const playerData = await getPlayerData(issue.body);
    if (!playerData.player || !playerData.version) {
      throw new Error('player or version are missing');
    }
    await setBranchName(playerData);
    await updateFiles(playerData.player, playerData.version);
    console.log('RUN ENDED');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()