import { createLog } from './create-log';

export function createDbLogger ({ db }) {
  if (!db) throw new Error('The db used to init the logger is "undefined"');

  const collectionName = 'logs';
  const saveLog = (msg, type) => db.saveItems(collectionName, [createLog(msg, type)]);

  return {
    info: msg => saveLog(msg, 'info'),
    error: msg => saveLog(msg, 'error'),
    queryAll: () => db.queryAllItems(collectionName)
  };
}
