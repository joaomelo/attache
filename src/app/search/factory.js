import { createDummySearch } from './dummy';
import { createScaleSerpSearch } from './scale-serp';

export function createSearch (type, options) {
  switch (type) {
    case 'vanilla': return createDummySearch(options);
    case 'scale': return createScaleSerpSearch(options);
    default: throw new Error(`search type ${type} is invalid`);
  };
};
