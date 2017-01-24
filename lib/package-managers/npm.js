var opm = require('../opm')
	, spawn = require('child_process').spawn
  , async = require('async')

function getInstalledPackages(cb) {
  var rawOutput = ''
  var npmOutdatedCmd = spawn('npm', ['ls', '--global', '--json', '--depth=0'])

  npmOutdatedCmd.stdout.on('data', (data) => {
    rawOutput += data
  })

  npmOutdatedCmd.on('close', () => {
    var installedPackages = JSON.parse(rawOutput).dependencies

    var packages = Object.keys(installedPackages).map((package) => {
      return installedPackages[package].from
    })

    cb({
      packageManager: 'npm',
      packages: packages
    })
  })
}

function getOutdatedPackages() {
  var outdatedPackages = []
  var rawOutput = ''

  var npmOutdatedCmd = spawn('npm', ['outdated', '--global', '--json', '--depth=0'])

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
  })
}

function installPackage(package, cb) {
  var npmInstallCmd = spawn('npm', ['install', '--global', package])

  npmInstallCmd.on('close', cb)
  npmInstallCmd.stdout.pipe(process.stdout)
  npmInstallCmd.stderr.pipe(process.stderr)
}

opm.on('backup', (cb) => getInstalledPackages(cb))
opm.on('npm:install', (package, cb) => installPackage(package, cb))
opm.on('outdated', (cb) => cb(getOutdatedPackages()))
opm.on('restore', (packages, cb) => async.map(packages, installPackage, cb))
