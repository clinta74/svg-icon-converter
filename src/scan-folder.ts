import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import xmlObjects from 'xml-objects';

import { createIcon } from './create-icon';
import { render } from './generate-icon';

type ScanSourceFolder = {
  sourceFolder: string,
  outputFolder: string,
  libraryName: string,
  extension?: string,
}

type GetSourceFolderStream = (props: ScanSourceFolder) => NodeJS.ReadableStream;

const getSourceFolderStream: GetSourceFolderStream = ({ sourceFolder, extension = 'svg' }) =>
  fg.stream([`${sourceFolder}/**/*.${extension}`]);

const parseSVG = (filename: string, outputFolder: string) => {
  const file = path.resolve(filename);

  fs.createReadStream(file)
    .pipe(xmlObjects({explicitRoot: false, explicitArray: false, mergeAttrs: true, normalizeTags: true}))
    .on('data', (svg: any) => { 
      const icon = render(createIcon(svg, filename));
      const outputFilename = path.resolve(outputFolder, `${path.parse(filename).name}.js`);
      console.log('Output Filename: ', outputFilename);

      fs.mkdir(outputFolder, { recursive: true }, (error) => {
        if(error) throw error;
        const outStream = fs.createWriteStream(outputFilename);
      
        outStream.on('error', console.error);
        outStream.write(icon);
        outStream.end();
      })
    })
    .on('error', console.error);
}

export const convert = (params: ScanSourceFolder) => {
  getSourceFolderStream(params)
    .on('data', (filename: string) => {
      parseSVG(filename, params.outputFolder);
    })
    .on('error', console.error);
}
