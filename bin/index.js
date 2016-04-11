#!/usr/bin/env node

var opm = require('../lib/opm')
  , helpStrings = require('../lib/help-strings')
  , argv = process.argv.slice(2)

if (argv[0] === 'help' || argv[0] === '--help' || argv[0] === '-h') {
  console.log(helpStrings.usage)
  process.exit()
}

opm.init()

if (argv[0] === 'outdated') {
  opm.outdated()
} else if (argv[0] === 'install') {
  opm.install(argv[1], argv[2])
} else {
  console.log(helpStrings.shortUsage)
}
