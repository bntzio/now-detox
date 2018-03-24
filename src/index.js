const {Command, flags} = require('@oclif/command')

const { getDeployments } = require('./api/now')

class NowPurgeCommand extends Command {
  async run () {
    const { flags } = this.parse(NowPurgeCommand)
    const token = process.env.NOW_TOKEN || flags.token

    if (!token) {
      this.log('Yikes! 😬  You must provide a zeit now token!')
      return this.log('Go to https://zeit.co/account/tokens to get one, please.')
    }

    const deployments = getDeployments(token)
    deployments.then((result) => {
      const parsedResult = JSON.parse(result).deployments
      parsedResult.map((deployment) => {
        this.log(deployment.name)
      })
    }).catch((error) => {
      if (error) {
        this.log('Oops! 🙈 There was an error!')
        this.log('Please submit an issue at https://github.com/bntzio/now-purge/issues 🐛')
        this.log('')
        this.log(`Error: ${error}`)
      }
    })
  }
}

NowPurgeCommand.description = `
now-purge removes all your now deployment instances with a single command 👉🔘

Instructions:
1. Get a zeit now token at https://zeit.co/account/tokens
2. Set your token as NOW_TOKEN in your shell or just export it
3. Run now-purge! 👉 now-purge
4. Enjoy! 🎉
`

NowPurgeCommand.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),
  token: flags.string({ char: 't', description: 'pass zeit now token' })
}

module.exports = NowPurgeCommand
