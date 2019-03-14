import Mustache from 'mustache';
import { Transform } from 'stream';

export type Icon = {
    name: string,
    filename: string,
}
export type LibraryData = {
  libraryName: string,
  icons: Icon[],
}

const TEMPATE = 
`[[#icons]]
import { [[name]] } from './[[filename]]';
[[/icons]]

import { IconLibrary } from 'react-svg-icon-host';

export const [[libraryName]]: IconLibrary = {
[[#icons]]
  [[name]],
[[/icons]]
};
`;

export const generateLibraryFile = (view: LibraryData) => {
  return Mustache.render(TEMPATE, view, undefined, ['[[', ']]']);
}

export const generateLibraryFileTransform = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(generateLibraryFile(chunk));
    callback();
  }
});