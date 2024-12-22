import { writeFileSync } from 'fs';
import parser from "./tree-parser/index.js";

const base = "https://minimal-decap-cms-tests.netlify.app"

const tree = JSON.stringify(parser('./src', base), null, 2);

console.log(tree)

writeFileSync('./src/endpoints.json', tree)