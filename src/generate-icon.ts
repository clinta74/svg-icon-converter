import Mustache from 'mustache';
import { IconData } from './scan-folder';

const TsTemplate = `export const {{iconName}} = {
  height: {{ height }},
  width: {{ width }},
  paths: {{ paths }}
};`;

export const render = (view: IconData) => {
  return Mustache.render(TsTemplate, view);
}