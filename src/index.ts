import program from 'commander';
import { convert } from './scan-folder';

program
  .version(process.version, '-v, --vesrion')
  .option('-s, --source-folder <sourceFolder>', 'Source folder of SVGs')
  .parse(process.argv);

if(program.sourceFolder) {
  const { sourceFolder } = program;
  
  convert({ 
    sourceFolder 
  });
}