var opm = require('../opm')
  , spawn = require('child_process').spawn

opm.on('outdated', (cb) => {
  var outdatedPackages = []
  var rawOutput = ''

  var apmOutdatedCmd = spawn('apm', ['outdated', '--json'])

  apmOutdatedCmd.stdout.on('data', (data) => {
    rawOutput += data
  })

  apmOutdatedCmd.on('close', () => {
    JSON.parse(rawOutput).map((package) => {
      outdatedPackages.push({
        name: package.name,
        version: package.version,
        latestVersion: package.latestVersion,
        packageManager: 'apm'
      })
    })

    cb(outdatedPackages)
  })
})

opm.on('apm:install', (package, cb) => {
  var apmInstallCmd = spawn('apm', ['install', package])

  apmInstallCmd.on('close', cb)
  apmInstallCmd.stdout.pipe(process.stdout)
  apmInstallCmd.stderr.pipe(process.stderr)
})
