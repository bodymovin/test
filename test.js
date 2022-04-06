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
  const player = fileData.stats[player];
  const objKeys = Object.keys(player)
  fileData.stats[player][version] = player[objKeys[objKeys.length - 1]];
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
  console.log(issueBody)
  return {
    version: '5.9.13',
    player: 'lottie-web',
  }
}

const getBranchName = async(playerData) => {
  return `${playerData.player}__${playerData.version}`
}

async function run() {
  try {
    if (github.event.issue.title.toLowerCase() !== 'new version') {
      // return;
    }
    const playerData = await getPlayerData(ithub.event.issue.body);
    const branchName = getBranchName(playerData);
    core.setOutput("branch_name", branchName);

    await updateFiles(playerData.player, playerData.version);
    console.log('RUN ENDED');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()