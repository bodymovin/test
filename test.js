const core = require('@actions/core');
const github = require('@actions/github');
const {readdir, readFile, writeFile} = require('fs/promises');
const path = require('path');


console.log('TESTING 1')

const editFile = async (filePath, player, version) => {
  const file = await readFile(filePath, 'utf-8');
  const fileData = JSON.parse(file);
  fileData.stats[player][version] = 'y'
  const updateFileString = JSON.stringify(fileData, null, 2)
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

async function run() {
  await updateFiles('lottie-web', '5.9.12')
  console.log('RUN ENDED')
  try {
    console.log('TESTING 5')
    // console.log(core)
    core.setOutput("branch_name", "branch_from_output");
    core.setOutput("branch_name_job", "branch_from_output_job");
    core.setOutput("branch_name_job2", "branch_name_job2");
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(GITHUB_TOKEN);
    // Issue title: github.event.issue.title
    // Issue body: github.event.issue.body
    console.log('TESTING 6')
  
  
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()