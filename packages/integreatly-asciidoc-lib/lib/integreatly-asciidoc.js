import { Walkthrough } from './src/types';
export * from './src/types';

function generate (parsedAsciidoc) {
  return Walkthrough.fromAdoc(parsedAsciidoc);
}

export { generate };
