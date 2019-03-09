import Mustache from 'mustache';
import { IconData } from './create-icon';
import { Transform } from 'stream';
import fs from 'fs';

const TsTemplate = `export const {{iconName}} = {
  height: {{ height }},
  width: {{ width }},
  paths: [
    {{#paths}}
    \`{{.}}\`,
    {{/paths}}
  ]
};`;

export const generateIconFile = (view: IconData, outputFilename: string) => {
  console.log('Generate Icon: ', view.iconName);
  outputIconFile(Mustache.render(TsTemplate, view), outputFilename);
}

const outputIconFile = (icon: string, outputFilename: string) => {
  const outStream = fs.createWriteStream(outputFilename);

  outStream.on('error', console.error);
  outStream.write(icon);
  outStream.end();
};

export const generateIconFileTransform = (outputFilename: string) => new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(generateIconFile(chunk, outputFilename));
    callback();
  }
});