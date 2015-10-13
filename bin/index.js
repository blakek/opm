#!/usr/bin/env node

var opm = require('../lib/opm')
  , helpStrings = require('../lib/help-strings')
  , argv = process.argv.slice(2)

if (typeof argv[0] === 'undefined') {
	console.log(helpStrings.shortUsage)
	process.exit()
} else if (argv[0] === 'help' || argv[0] === '--help' || argv[0] === '-h') {
	console.log(helpStrings.usage)
	process.exit()
}

opm.init()

if (argv[0] === 'outdated') {
	opm.outdated()
}
