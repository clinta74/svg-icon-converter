import Mustache from 'mustache';
import { IconData } from './create-icon';

const TsTemplate = `export const {{iconName}} = {
  height: {{ height }},
  width: {{ width }},
  paths: [
    {{#paths}}
    \`{{.}}\`,
    {{/paths}}
  ]
};`;

export const render = (view: IconData) => {
  return Mustache.render(TsTemplate, view);
}