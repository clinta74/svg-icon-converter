#!/usr/bin/env node

import program from 'commander';
import { convert } from './convert';
import path from 'path';

program
  .version('1.0.0', '-v, --version')
  .option('-s, --source-folder <sourceFolder>', 'Source folder of SVGs')
  .option('-o, --output-folder <outputFolder>', 'Output folder to save icons.')
  .option('-l, --library-name <libraryName>', 'Name of export const for library file.')
  .parse(process.argv);

if(program.sourceFolder) {
  const { sourceFolder } = program;
  const outputFolder = program.outputFolder || path.resolve(`${sourceFolder}/output`);
  const libraryName = program.libraryName;
  
  convert({ 
    sourceFolder,
    outputFolder,
    libraryName,
  });
}

export default convert;