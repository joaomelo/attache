import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { initServicesRuntime } from '../app/runtime';
import { runSnapshotsService } from './snapshots-service';

const runtime = initServicesRuntime('firebase');

export const snapshotsService = runtime.createScheduledService(() => runSnapshotsService(), 60);
