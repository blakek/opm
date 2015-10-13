# opm

Orchestrating Package Manager: A simple, consistent front-end to package
managers to let you manage everything in one place.

It is NOT a package manager, but simply "orchestrates" real package managers
with a few, easy-to-remember commands.

*Note: A proper README is coming after a the API is more stable.*

## Installation

To install from npm, run

`npm install -g opm`

## Usage

`opm action args ...`

Where an **action** can be:

  * `install` → install new packages
  * `outdated` → lists outdated packages
  * `upgrade` → upgrades existing packages

## Adding functionality

Again, *much* better documentation is coming soon.

To add your own plugin (e.g. for a real package manager or something similar),
just about everything is optional.  It is recommended you have:

  - a function to install new packages
  - a function to list outdated packages
  - a function that can upgrade already installed packages

More information is coming soon, but the gist of it is:

### require() the opm module
```javascript
var opm = require('opm')
```

### Listen for pre-defined events
For example:

```javascript
opm.on('outdated', (cb) => {
	// List outdated packages
}
```

### Give back opm the output to deal with
```javascript
opm.on('outdated', (cb) => {
	// Call cb() with an array of outdated package objects, for example:
	var outdatedPackages = exec('fakeCommand update && fakeCommand outdated')
	cb(outdatedPackages)
}
```
