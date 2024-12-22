import fs from 'fs';
import path from 'path';
import dirContent from './dir-content.js';
import parseJSON from './parse-json.js';
import includes from './includes.js';

/**
 * Takes a directory path and optional names for internal JSON files to include
 * them inside the returned object
 * @param {string} rootPath Absolute or relative path for a directory to parsed
 * @param {Object} filesToParse Comma separated list of JSON file names to be included in the resulting object
 * @param {string} baseURL The base URL of the site (e.g., 'https://meusite.com')
 * @returns {Object} A JavaScript object representing a directory tree and its content
 */

const parseTree = (rootPath, baseURL, ...filesToParse) => {
  let dirStructure = {};
  dirStructure._contents = [];

  dirContent(rootPath).forEach(filePath => {
    const target = fs.statSync(filePath);
    const fileName = path.basename(filePath);
    const rawFileName = path.basename(filePath, '.json');

    // Calcular o path relativo e substituir as barras invertidas por barras normais
    let relativePath = path.relative(rootPath, filePath);
    relativePath = relativePath.replace(/\\/g, '/');  // Garantir que seja / no lugar de \

    const fullPath = `${baseURL}/${relativePath.replace(/\.json$/, '')}`;  // Gerar o fullPath

    if (target.isDirectory()) {
      // Se for uma pasta, recursivamente adicionar seus caminhos
      dirStructure[fileName] = parseTree(filePath, baseURL, ...filesToParse);
    } else {
      // Se for um arquivo JSON e estiver nos arquivos a serem parseados, parse ele
      if (includes(filesToParse, rawFileName)) {
        dirStructure[fullPath] = parseJSON(filePath);  // Adiciona o conteúdo do arquivo JSON
      } else {
        // Adicionar o arquivo à lista de conteúdos
        dirStructure._contents.push({ fullPath, relativePath });
      }
    }
  });

  return dirStructure;
};

export default parseTree;
