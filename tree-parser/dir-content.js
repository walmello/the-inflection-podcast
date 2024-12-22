import fs from 'fs';
import path from 'path';

/**
 * Creates a list of file paths (including files in subdirectories) inside a given directory.
 * @param {string} dirPath Directory path to be parsed
 * @returns {string[]} List of file paths (full paths) inside a given directory and subdirectories
 */
const dirContent = (dirPath) => {
  let files = [];
  
  // Lê o conteúdo do diretório
  const entries = fs.readdirSync(dirPath);

  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry);  // Caminho completo do arquivo/pasta
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Se for um diretório, faz chamada recursiva
      files = files.concat(dirContent(fullPath));
    } else {
      // Se for um arquivo, adiciona à lista de arquivos
      files.push(fullPath.replace(/\\/g, '/'));  // Substitui barras invertidas por barras normais
    }
  });

  return files;
};

export default dirContent;
