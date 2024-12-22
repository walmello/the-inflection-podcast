import { writeFileSync } from 'fs';
import parser from "./tree-parser/index.js";

const base = "https://minimal-decap-cms-tests.netlify.app/"
const tree = parser('./src', base);

console.log(tree)

writeFileSync('./src/endpoints.json', JSON.stringify(tree, null, 2))