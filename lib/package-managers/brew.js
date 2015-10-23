var opm = require('../opm')
  , exec = require('child_process').exec

opm.on('outdated', (cb) => {
	var outdatedPackages = []

	exec('brew outdated', (err, stdout, stderr) => {
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

opm.on('brew:install', (package, cb) => {
    exec(`brew install ${package}`, (err, stdout, stderr) => {
        console.log(stdout)
        
		cb()
	})
})
