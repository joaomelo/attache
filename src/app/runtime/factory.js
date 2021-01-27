import { initVanillaRuntime } from './vanilla';
import { initFirebaseRuntime } from './firebase';

export function initServicesRuntime (type, options) {
  switch (type) {
    case 'vanilla': return initVanillaRuntime(options);
    case 'firebase': return initFirebaseRuntime(options);
    default: throw new Error(`runtime type "${type}" is invalid`);
  }
}
