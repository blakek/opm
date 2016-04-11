var opm = require('../opm')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn

opm.on('outdated', (cb) => {
  var outdatedPackages = []

  exec('brew update', () => {
    exec('brew outdated', (err, stdout) => {
      stdout.split('\n').map((package) => {
        if (package !== '') {
          outdatedPackages.push({
            name: package,
            packageManager: 'brew'
          })
        }
      })

      cb(outdatedPackages)
    })
  })
})

opm.on('brew:install', (package, cb) => {
  var brewInstallCmd = spawn('brew', ['install', package])

  brewInstallCmd
    .on('close', cb)
    .stdout.pipe(process.stdout)
})
