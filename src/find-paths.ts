type PathAttr = {
  d: string;
}

const mapPath = (paths: PathAttr | PathAttr[]) =>
  Array.isArray(paths) ? [ ...paths] : [ paths ];

export const findPaths = (svg: any) => {
  let paths: string[] = [];

  if(svg['path']) {
    paths = [...paths,...mapPath(svg['path']).map(p => p.d)];
  }

  if(svg['g'] && svg['g']['path']) {
    paths = [...paths,...mapPath(svg['g']['path']).map(p => p.d)];
  }
  return paths;
}