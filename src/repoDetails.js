const apiBase = 'https://api.github.com'

const axios = require('axios')
const config = require('./config')
const chalk = require('chalk')
const ConsoleProgressBar = require('console-progress-bar')
const http = axios.create({
  baseURL: apiBase,
  headers: {
    Authorization: `token ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
})

async function getUser() {
  try {
    const response = await http.get('/user')
    return response.data
  } catch (err) {
    console.error(chalk.red(err))
    console.dir(err.response, { colors: true, depth: 4 })
  }
}

async function getUserCommits(username, repo) {
  try {
    const response = await http.get(
      '/repos/' + username + '/' + repo + '/commits',
    )
    return response.data
  } catch (err) {
    console.error(chalk.red(err))
    console.dir(err.response.message, { colors: true, depth: 4 })
  }
}

async function getUserComments(owner, repo) {
  const event = new Date()
  event.setDate(event.getDate() - 180)
  event.toISOString()
  try {
    const response = await http.get(
      '/repos/' + owner + '/' + repo + '/issues/comments?since=' + event,
    )
    return response.data
  } catch (err) {
    console.error(chalk.red(err))
    console.dir(err.response.data, { colors: true, depth: 4 })
  }
}

function printRepoDetails() {
  console.log(
    'Fetching comments ' +
      chalk.red('for') +
      ' past 180 days ' +
      chalk.red('for') +
      chalk.yellow(' "test-org/test-repo"') +
      '...\r\n',
  )
  const consoleProgressBar = new ConsoleProgressBar({ maxValue: 100 })

  let progress = setInterval(() => {
    consoleProgressBar.addValue(1)
  }, 100)

  const repo = process.argv[3]
  getUser().then(user => {
    consoleProgressBar.setValue(50)
    Promise.all([
      getUserCommits(user.login, repo),
      getUserComments(user.login, repo),
    ]).then(res => {
      clearInterval(progress)
      consoleProgressBar.setValue(100)

      let commits = res[0].length
      let comments = res[1].length
      console.log(
        '\r\n' +
          comments +
          ' comments, ' +
          user.login +
          ' (' +
          commits +
          ' commits)',
      )
    })
  })
}

printRepoDetails()
