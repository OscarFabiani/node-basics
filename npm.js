/*

This file explores the basics of the Node Package Manager.


npm: The Node Package Manager is a command line tool used by developers to share and control modules (or packages) of JavaScript
code written for use with Node.js.


package.json: When starting a new project using the npm init command, npm generates a package.json file. This file lists the
package dependancies for your project. Since npm packages are regularly updated, the package.json file allows you to set
specific version numbers for each dependancy. This ensures that updates to a package don't break your project. This file
alos acts as manifest for the project containing basic project info as well as scripts.

package.json format:
{
  "name": "project-name", //This is the name of the project
  "version": "0.0.1", //This is the version of the project
  "description": "A project", //This describes the project
  "main": "server.js", //This is the "entry point" to the project
  "scripts": { //This object contains scripts that can be run
    "start": "node server.js" //standard script used to start application by convention
  },
  "dependencies": { //This is an object with packages which the project is dependant on and their version
    "package-name": "version"
  },
  "repository": { //This object contains repository details
    "url": "https://glitch.com/edit/#!/hello-express"
  },
  "license": "MIT", //This specifies the project's license
  "keywords": [ //This is a list of keywords related to the project
    "node",
    "glitch",
    "express"
  ]
}

node modules folder: npm saves packages in a folder called node modules. These packages can be installed either globally in a
root node modules folder, accessible by all projects, or locally within a project's own node-modules folder, accessible only to
that project. Most developers prefer to install packages local to each project to create a seperation between the dependencies
of different projects.


SemVer: Semantic versioning is an industry standard for software versioning aiming to make it easier to manage dependencies
by communicating what kind of changes that projects who depend on the package can expect if they update.
EX:
Given a version number MAJOR.MINOR.PATCH, increment the:
MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.

This means that PATCHes are bug fixes and MINORs add new features but neither of them break what worked before, while MAJORs
add changes that won't work with earlier versions.


Tilde prefix for version: Prefixing a dependencies version with a tilde allows a npm dependency to get updated to the latest
PATCH version.

Caret prefix for version: Prefixing a dependencies version with a caret allows a npm dependency to get updated to the latest
MINOR and PATCH version.


SHORTCUTS:

npm || npm help: Opens help
npm init||create: creeates a package.json file
npm install||i||add: installs all modules listed as dependencies in package.json
npm install <package>: installs a package in the local node_modules folder
npm uninstall||unlink||un||remove||rm||r <package>: deletes a package from the local node_modules folder
npm list||la||ll: lists installed packages
npm root: lists the path of the node_modules folder



*/