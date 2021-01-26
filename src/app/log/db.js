import { createLog } from './create';

export function createDbLogger (db) {
  return {
    info: msg => db.saveLog(createLog(msg, 'info')),
    error: msg => db.saveLog(createLog(msg, 'error'))
  };
}
