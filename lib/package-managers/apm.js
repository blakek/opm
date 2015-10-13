var opm = require('../opm')
  , spawn = require('child_process').spawn

opm.on('outdated', function (cb) {
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
