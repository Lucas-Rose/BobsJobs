const utils = require('./cypress/integration/utils.js')
const fs = require('fs')

/* Read and parse the JSON data */
const jsonFileName = 'frontend/src/sample-data.json'
console.log(`Loading data from ${jsonFileName}`)
const rawData = fs.readFileSync(jsonFileName)
const data = JSON.parse(rawData)
utils.uploadData(data)