import fs from 'fs';
//import parser from "./tree-parser/index.js";

const base = "https://minimal-decap-cms-tests.netlify.app"
const entries = fs.readdirSync('./src').filter(entry => {
  return !['admin', 'index.html'].includes(entry)
})

entries.forEach(entry => {
  const result = []

  const subentries = fs.readdirSync(`./src/${entry}`).filter(entry => {
  return !['index.json'].includes(entry)
})
  subentries.forEach(subentry => {
    const type = subentry.split('.')[1]
    const aux = {
      [subentry]: subentry
    }
    if(type === 'json'){
      const content = JSON.parse(fs.readFileSync(`./src/${entry}/${subentry}`, 'utf-8'))
      console.log(content)
      result.push({
        [subentry]: content
      })
    } else {
      result.push(subentry)
    }
  })
  fs.writeFileSync(`./src/${entry}/index.json`, JSON.stringify(result, null, 2))
})
