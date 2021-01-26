import { createId } from '../../helpers';

export function createLog (msg, type) {
  return {
    id: createId(),
    msg,
    type,
    when: new Date()
  };
}
