import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { initServicesRuntime } from '../app/runtime';
import { dispatchRankingsService } from './service-dispatch-rankings';
import { fishSnapshotsService } from './service-fish-snapshots';

const runtime = initServicesRuntime('firebase');

const snapshotsFrequencyInMinutes = 60 * 12;
export const snapshotsService = runtime
  .createScheduledService(fishSnapshotsService, snapshotsFrequencyInMinutes);

const rankingsFrequencyInMinutes = 60 * 24;
export const rankingsService = runtime
  .createScheduledService(dispatchRankingsService, rankingsFrequencyInMinutes);
