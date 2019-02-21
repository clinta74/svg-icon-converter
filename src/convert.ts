import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import Case from 'case';
import { parseSVG } from './parse-svg';
import { generateLibraryFile, LibraryData } from './generate-library-file';
import { version } from 'punycode';

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
    iconNames: [],
  }

  const srcStream = getSourceFolderStream(options)
    .on('error', console.error);

  srcStream.on('data', (filename: string) => {
      const outputFilename = path.resolve(outputFolder, `${path.parse(filename).name}.js`);

      fs.mkdir(outputFolder, { recursive: true }, (error) => {
        if (error) throw error;
        parseSVG(filename, outputFilename);
      });
    });
  
    if(libraryName) {
      libraryData.libraryName = libraryName;

      srcStream.on('data', (filename: string) => {
        const baseFilename = path.parse(filename).name;
        libraryData.iconNames.push(baseFilename);
      });

      srcStream.on('end', () => {
        const outputFilename = path.resolve(outputFolder, `index.js`);
        const libraryFile = generateLibraryFile(libraryData);
        // console.log(`Writing library file. ${outputFilename}`, libraryFile);
        const outStream = fs.createWriteStream(outputFilename);

        outStream.on('error', console.error);
        outStream.write(libraryFile);
        outStream.end();
      })
    }

    srcStream.on('end', () => {
      console.info('Finished.');
    });
}
