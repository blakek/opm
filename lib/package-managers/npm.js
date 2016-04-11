var opm = require('../opm')
	, spawn = require('child_process').spawn

opm.on('outdated', (cb) => {
  var outdatedPackages = []
  var rawOutput = ''

  var npmOutdatedCmd = spawn('npm', [
    'outdated', '--global', '--json', '--depth=0'
  ])

  npmOutdatedCmd.stdout.on('data', (data) => {
    rawOutput += data
  })

  npmOutdatedCmd.on('close', () => {
    var outdatedObj = JSON.parse(rawOutput)

    Object.keys(outdatedObj).map((package) => {
      outdatedPackages.push({
        name: package,
        version: outdatedObj[package].current,
        latestVersion: outdatedObj[package].latest,
        packageManager: 'npm'
      })
    })

    cb(outdatedPackages)
  })
})

opm.on('npm:install', (package, cb) => {
  var npmInstallCmd = spawn('npm', ['install', '--global', package])

  npmInstallCmd.on('close', cb)
  npmInstallCmd.stdout.pipe(process.stdout)
  npmInstallCmd.stderr.pipe(process.stderr)
})
