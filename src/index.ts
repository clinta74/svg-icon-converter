import program from 'commander';
import { convert } from './scan-folder';
import path from 'path';

program
  .version(process.version, '-v, --vesrion')
  .option('-s, --source-folder <sourceFolder>', 'Source folder of SVGs')
  .option('-o, --output-folder <outputFolder>', 'Output folder to save icons.')
  .option('-l, --libray-name <libraryName', 'Name of export const for library file.')
  .parse(process.argv);

if(program.sourceFolder) {
  const { sourceFolder } = program;
  const outputFolder = program.outputFolder || path.resolve(`${sourceFolder}/output`);
  const libraryName = program.libraryName || 'IconLibrary'
  
  convert({ 
    sourceFolder,
    outputFolder,
    libraryName,
  });
}