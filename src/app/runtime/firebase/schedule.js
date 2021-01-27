import * as functions from 'firebase-functions';

export function createScheduledService (callback, frequencyInMinutes) {
  const frequencyInAppEngineSyntax = `every ${frequencyInMinutes} minutes`;

  return functions
    .pubsub
    .schedule(frequencyInAppEngineSyntax)
    .onRun(async context => callback());
}
