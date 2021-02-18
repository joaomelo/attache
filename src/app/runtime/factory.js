import { createVanillaScheduledService } from './vanilla';
import { createFirebaseScheduledService } from './firebase';

export function createScheduledService (type, options) {
  switch (type) {
    case 'vanilla': return createVanillaScheduledService(options);
    case 'firebase': return createFirebaseScheduledService(options);
    default: throw new Error(`runtime type "${type}" is invalid`);
  }
}
