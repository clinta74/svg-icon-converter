import path from 'path';
import { get } from "lodash";
import Case from 'case';

import { findPaths } from './find-paths';

export type IconData = {
  iconName: string,
  height: number,
  width: number,
  paths: string[],
}

export const createIcon = (svg: any, filename: string) => {
  const viewbox = get(svg, 'viewbox', '0 0 10 10').split(' ');
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