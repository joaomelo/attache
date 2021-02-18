export function createVanillaScheduledService ({ callback, frequencyInMinutes }) {
  if (!Number.isInteger(frequencyInMinutes)) throw new Error('Frequency must be a integer');
  if (Math.sign(frequencyInMinutes) !== 1) throw new Error('Frequency must be positive');

  const frequencyInMilliseconds = frequencyInMinutes * 60 * 1000;
  return setInterval(callback, frequencyInMilliseconds);
}
