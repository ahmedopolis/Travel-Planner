# WoRlDnOmAd Travel Planner 🗺️🛩️🌄

## Table of Content

1. [Design](#Design)
2. [Instructions](#Instructions)
   1. [Download repository files](#Download-repository-files)
   2. [Setup environment](#Setup-environment)
   3. [Add modules to setup server](#Add-module-to-setup-server)
   4. [Conduct npm audit](#Conduct-npm-audit)
   5. [Add 'dotenv' module](#Add-'dotenv'-module)
   6. [Add the following 'start' script in 'package.json'](#Add-the-following-'start'-script-in-'package.json')
   7. [Add testing via 'Jest' for unit-testing](#Add-testing-via-'Jest'-for-unit-testing)
   8. [Install 'node-fetch'](#Install-'node-fetch')
   9. [Install 'cors'](#Add-the-OpenWeatherMap-Api-key)
3. [Examples](#Examples)
4. [Tools](#Tools)
5. [License](#License)

## Design

List of APIs: GeoNames, Weatherbit, Pixabay

GeoNames Api Docs: http://www.geonames.org/export/web-services.html

Weatherbit Api Docs: https://www.weatherbit.io/api

Pixabay Api Docs: https://pixabay.com/api/docs/

## Instructions

### Download repository files

To have access to the assets necessary for the project, you may download the 'zip file' directly from the herein repository. Otherwise, you can clone the repository by using Git (<https://github.com/aimogue/NLP-Article-Analyzer-Web-Tool.git>), SSH (git@github.com:aimogue/NLP-Article-Analyzer-Web-Tool.git) Github CLI (gh repo clone aimogue/NLP-Article-Analyzer-Web-Tool) or Github Desktop. For more information on to clone a repository, please use the following link: <https://docs.github.com/en/free-pro-team@latest/github/using-git/which-remote-url-should-i-use>.

### Setup environment

Once the assets are within a folder, the environment needs to be setup. To do-so, it would be worthwhile using Git commands. It is pre-installed on Mac OS and Linux Distros, but not on Windows. For more information on how to setup Git on PC, please use the following link: <https://www.computerhope.com/issues/ch001927.htm>. To use the herein project, it will be necessary to have both Node.js and npm. To download them, please use the following link: <https://www.npmjs.com/get-np>.
</br></br>

To check if Node.js is installed, run the following command in the terminal:

```bash
node -v
```

To confirm that npm is installed, run this command in the terminal:

```bash
npm -v
```

To initialize the project, use the following command:

```bash
npm init
```

### Add modules to setup server

Use the following line, to add Node.js, and Express.js.

```bash
npm i node express
```

### Conduct npm audit

Use the following line, to check for dependency vulnerabilities and potentially fix them.

```bash
npm audit fix
```

### Add 'dotenv' module

Use the following command line to add the 'dotenv' module.

```bash
npm install dotenv
```

### Add the following 'start' script in 'package.json'

Replace the following command:

```json
"scripts": {
    "start": "node src/server/index.js",
},
```

### Add testing via 'Jest' for unit-testing

Use the following line, to install the 'jest' library as a development dependency. As unit testing, is not conducted in production mode.

```bash
npm install --save-dev jest
```

### Install 'node-fetch'

Use the following command to add a light-weight module that brings window.fetch to Node.js.

```bash
npm install node-fetch
```

### Add NeDB module

Use the following command to add the NeDB module:

```bash
npm i nedb
```

### Add moment.js

Use the following command to add the moment.js module:

```bash
npm install moment --save
```

### List of all needed npm commands

All commands needed are found below:

```bash
npm init
npm i node express
npm install dotenv
npm i cors
npm i http
npm install --save-dev jest
npm install node-fetch
npm install moment --save

npm i nedb
```

## Examples

## Tools

## License

This codebase is a public domain, so feel free to use this repo for what you want.
