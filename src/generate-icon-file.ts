import Mustache from 'mustache';
import { IconData } from './create-icon';
import { Transform } from 'stream';

const TsTemplate = `export const {{iconName}} = {
  height: {{ height }},
  width: {{ width }},
  paths: [
    {{#paths}}
    \`{{.}}\`,
    {{/paths}}
  ]
};`;

export const generateIconFile = (view: IconData) => {
  return Mustache.render(TsTemplate, view);
}

export const generateIconFileTransform = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(generateIconFile(chunk));
    callback();
  }
});