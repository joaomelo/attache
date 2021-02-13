import { createSendGridSandboxDispatch } from './grid-sandbox';
import { createSendGridDispatch } from './grid';

export function createDispatch (type, options) {
  switch (type) {
    case 'vanilla': return createSendGridSandboxDispatch(options);
    case 'sendGrid': return createSendGridDispatch(options);
    default: throw new Error(`dispatch type ${type} is invalid`);
  }
}
