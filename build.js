
const { writeFileSync } = require('fs')
const parser = require('tree-parser');

const tree = parser('./src');

console.log(tree)

writeFileSync('./src/endpoints.json', JSON.stringify(tree, null, 2))