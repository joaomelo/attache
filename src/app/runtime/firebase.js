export function createFirebaseScheduledService ({ callback, frequencyInMinutes, functions }) {
  const frequencyInAppEngineSyntax = `every ${frequencyInMinutes} minutes`;

  return functions
    .pubsub
    .schedule(frequencyInAppEngineSyntax)
    .onRun(async context => callback());
}
