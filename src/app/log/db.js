import { createLog } from './create';

export function createDbLogger (db) {
  if (!db) throw new Error('The db used to init the logger is "undefined"');

  return {
    info: msg => db.saveLog(createLog(msg, 'info')),
    error: msg => db.saveLog(createLog(msg, 'error'))
  };
}
