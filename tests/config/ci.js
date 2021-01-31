import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log('ci test environment');
console.log(process.env.FIRESTORE_EMULATOR_HOST);
console.log(process.env.FIREBASE_PROJECT);
