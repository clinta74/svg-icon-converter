import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import xmlObjects from 'xml-objects';
import { get } from 'lodash';
import Case from 'case';
import { render } from './generate-icon';

type ScanSourceFolder = {
  sourceFolder: string,
  extension?: string
}

type GetSourceFolderStream = (props: ScanSourceFolder) => NodeJS.ReadableStream;
type PathAttr = {
  d: string;
}

export type IconData = {
  iconName: string,
  height: number,
  width: number,
  paths: string[],
}

const getSourceFolderStream: GetSourceFolderStream = ({ sourceFolder, extension = 'svg' }) =>
  fg.stream([`${sourceFolder}/**/*.${extension}`]);

function parseSVG(filename: string) {
  const file = path.resolve(filename);

  fs.createReadStream(file)
    .pipe(xmlObjects({explicitRoot: false, explicitArray: false, mergeAttrs: true, normalizeTags: true}))
    .on('data', (svg: any) => createIcon(svg, filename))
    .on('error', console.error);
}

const mapPath = (paths: PathAttr | PathAttr[]) =>
  Array.isArray(paths) ? [ ...paths] : [ paths ];

function findPaths(svg: any) {
  let paths: string[] = [];

  if(svg['path']) {
    paths = [...paths,...mapPath(svg['path']).map(p => p.d)];
  }

  if(svg['g'] && svg['g']['path']) {
    paths = [...paths,...mapPath(svg['g']['path']).map(p => p.d)];
  }
  return paths;
}

function createIcon(svg: any, filename: string) {
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
  console.log('Icon: ', filename);
  console.log('Data: ', render(icon))
}

export function convert(params: ScanSourceFolder) {
  getSourceFolderStream(params)
    .on('data', (filename: string) => {
      parseSVG(filename);
    })
    .on('error', console.error);
}
