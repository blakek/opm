var fs = require('fs')
  , events = require('events')
  , eventEmitter = new events.EventEmitter()
  , pluginDirectory = __dirname + '/package-managers'

var Opm = {
  finishedInstall: function (err) {
    if (err && err.message) {
      console.log('Install error')
      console.log(err.message)
    } else {
      console.log('Done!')
    }
  },

  // Setup package manager and ready plugins
  init: function () {
    return fs.readdirSync(pluginDirectory).map((pm) => {
      require(`${pluginDirectory}/${pm}`)
    })
  },

  install: function (packageManager, package) {
    if (eventEmitter.listenerCount(`${packageManager}:install`) < 1) {
      console.log(`${packageManager} not available to install packages`)
    } else {
      eventEmitter.emit(`${packageManager}:install`, package, this.finishedInstall)
    }
  },

  // Allows plugins to register for events
  on: function (event, cb) {
    eventEmitter.on(event, cb)
  },

  // Tell plugins to list outdated packages
  outdated: function () {
    eventEmitter.emit('outdated', this.showOutdated)
  },

  // Utility function to print a package's info for a user to see
  printPackageInfo: function (package) {
    console.log(`(${package.packageManager})  ${package.name}`)
  },

  // Callback for 'outdated' event that shows outdated packages to the user
  showOutdated: function (outdatedPackages) {
    outdatedPackages.map(pkg => Opm.printPackageInfo(pkg))
  }
}

module.exports = Opm
