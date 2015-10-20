var fs = require('fs')
  , events = require('events')
  , eventEmitter = new events.EventEmitter()
  , pluginDirectory = __dirname + '/package-managers'

var Opm = {
	verbosity: 0,

	// Setup package manager and ready plugins
	init: function () {
		return fs.readdirSync(pluginDirectory).map( (pm) => {
			require(`${pluginDirectory}/${pm}`)
		})
	},

	// Allows plugins to register for events
	on: function (event, cb) {
		eventEmitter.on(event, cb)
	},

	// Utility function to print a package's info for a user to see
	printPackageInfo: function (package) {
		if (this.verbosity > 1) {
			console.log(`${package.name}    ${package.version ? package.version + ' < ': ''}${package.latestVersion ? package.latestVersion : ''}    (${package.packageManager})`)
		} else if (this.verbosity) {
			console.log(`(${package.packageManager})  ${package.name}`)
		} else {
			console.log(package.name)
		}
	},

	// Tell plugins to list outdated packages
	outdated: function () {
		eventEmitter.emit('outdated', this.showOutdated)
	},

	// Callback for 'outdated' event that shows outdated packages to the user
	showOutdated: function (outdatedPackages) {
		outdatedPackages.map( (pkg) => Opm.printPackageInfo(pkg) )
	}
}

module.exports = Opm
