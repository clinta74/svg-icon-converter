import Mustache from 'mustache';
import { IconData } from './create-icon';
import { Transform } from 'stream';

export type LibraryData = {
  libraryName: string,
  iconNames: string[],
}

const TEMPATE = 
`[[#iconNames]]
import { [[.]] } from './[[.]]'
[[/iconNames]]

export const [[libraryName]] = {
[[#iconNames]]
  [[.]],
[[/iconNames]]
};`;

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