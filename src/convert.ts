import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import Case from 'case';
import { parseSVG } from './parse-svg';
import { generateLibraryFile, LibraryData } from './generate-library-file';

type ScanSourceFolder = {
  sourceFolder: string,
  outputFolder: string,
  libraryName: string,
  extension?: string,
}

type GetSourceFolderStream = (options: ScanSourceFolder) => NodeJS.ReadableStream;

/**
 * Create a stream of filenames to be converted.
 * @param sourceFolder string - The sourceFolder to be scanned for files.
 * @param extension string - The file extension to be used when scanning a folder for files. (defaults = 'svg')
 * @returns ReadableStream - Stream of filenames
 */
const getSourceFolderStream: GetSourceFolderStream = ({ sourceFolder, extension = 'svg' }) =>
  fg.stream([`${sourceFolder}/**/*.${extension}`]);

/**
 * Converts files found int source folder to JavaScript in es6 module export format.
 */
export const convert = (options: ScanSourceFolder) => {
  const { outputFolder, libraryName } = options;

  let libraryData: LibraryData = {
    libraryName: Case.pascal(libraryName),
    icons: [],
  }

  const srcStream = getSourceFolderStream(options)
    .on('error', console.error)
    .on('data', (filename: string) => {
      const baseFilename = Case.kebab(path.parse(filename).name);
      const outputFilename = path.resolve(outputFolder, `${baseFilename}.ts`);

      fs.mkdir(outputFolder, { recursive: true }, (error) => {
        if (error) throw error;
        parseSVG(filename, outputFilename);
      });
    });
  
    if(libraryName) {
      libraryData.libraryName = libraryName;

      srcStream.on('data', (fullFilename: string) => {
        const baseFilename = Case.kebab(path.parse(fullFilename).name);
        const filename = Case.kebab(baseFilename);
        const name = Case.pascal(baseFilename);
        
        libraryData.icons.push({ name, filename });
      });

      srcStream.on('end', () => {
        const outputFilename = path.resolve(outputFolder, `index.ts`);
        const libraryFile = generateLibraryFile(libraryData);
        const outStream = fs.createWriteStream(outputFilename);

        outStream.on('error', console.error);
        outStream.write(libraryFile);
        outStream.end();
        console.log(`Writing library file. ${outputFilename}`);
      })
    }

    srcStream.on('end', () => {
      console.info('Finished.');
    });
}
