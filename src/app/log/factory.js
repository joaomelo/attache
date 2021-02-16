import { createDbLogger } from './db';

export function createLogger (type, options) {
  switch (type) {
    case 'db': return createDbLogger(options);
    default: throw new Error(`logger type ${type} is invalid`);
  };
};
