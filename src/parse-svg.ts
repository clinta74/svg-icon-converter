import xmlObjects from 'xml-objects';
import path from 'path';
import fs from 'fs';

import { createIconTransform } from './create-icon';
import { generateIconFileTransform } from './generate-icon-file';


/**
 * Takes a stream of filenames and opens a read filestream converts the file to a JavaScript object then saves the converted object to a file in es6 module format.
 * @param filename 
 * @param outputFolder
 */
export const parseSVG = (filename: string, outputFilename: string) => {
  const file = path.resolve(filename);

  fs.createReadStream(file)
    .on('error', console.error)
    .pipe(xmlObjects({ explicitRoot: false, explicitArray: false, mergeAttrs: true, normalizeTags: true }))
    .pipe(createIconTransform(filename))
    .pipe(generateIconFileTransform(outputFilename))
}