import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { initServicesRuntime } from '../app/runtime';
import { runSnapshotsService } from './service-snapshot';

const runtime = initServicesRuntime('firebase');
const frequencyInMinutes = 60;

export const snapshotsService = runtime.createScheduledService(runSnapshotsService, frequencyInMinutes);
