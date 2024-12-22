import fs from 'fs';
//import parser from "./tree-parser/index.js";

const base = "https://minimal-decap-cms-tests.netlify.app"
const entries = fs.readdirSync('./src').filter(entry => {
  return !['admin', 'index.html'].includes(entry)
})

entries.forEach(entry => {
  const subentries = fs.readdirSync(`./src/${entry}`).filter(entry => {
  return !['index.json'].includes(entry)
})
  fs.writeFileSync(`./src/${entry}/index.json`, JSON.stringify(subentries))
})
//const content = fs.readFileSync('')

//const tree = JSON.stringify(parser('./src', base), null, 2);



fs.writeFileSync('./src/blog/index.json', "")