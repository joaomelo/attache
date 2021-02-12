import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { initServicesRuntime } from '../app/runtime';
import { runRankingsService } from './service-rankings';
import { runSnapshotsService } from './service-snapshots';

const runtime = initServicesRuntime('firebase');

const snapshotsFrequencyInMinutes = 60 * 12;
export const snapshotsService = runtime
  .createScheduledService(runSnapshotsService, snapshotsFrequencyInMinutes);

const rankingsFrequencyInMinutes = 60 * 24;
export const rankingsService = runtime
  .createScheduledService(runRankingsService, rankingsFrequencyInMinutes);
