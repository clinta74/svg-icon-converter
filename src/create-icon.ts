import path from 'path';
import { get } from "lodash";
import Case from 'case';
import { Transform } from 'stream';
import { findPaths } from './find-paths';

export type IconData = {
  iconName: string,
  height: number,
  width: number,
  paths: string[],
}

export const createIcon = (svg: any, filename: string) => {
  const viewboxPath = svg.viewbox ? 'viewbox' : 'viewBox';
  const viewbox = get(svg, viewboxPath, '0 0 10 10').split(' ');
  const height = svg['height'] || (Number(viewbox[3]) - Number(viewbox[1]));
  const width = svg['width'] || (Number(viewbox[2]) - Number(viewbox[0]));
  const paths = findPaths(svg);
  const baseFilename = path.parse(filename).name;
  const icon: IconData = {
    iconName: Case.pascal(baseFilename),
    height,
    width,
    paths,
  }

  return icon;
}

export const createIconTransform = (filename: string) => new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(createIcon(chunk, filename));
    callback();
  }
});