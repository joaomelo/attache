import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as functions from 'firebase-functions';
import { createScheduledService } from '../app/runtime';
import { dispatchRankingsService } from './service-dispatch-rankings';
import { fishSnapshotsService } from './service-fish-snapshots';

export const snapshotsService = createScheduledService('firebase', {
  callback: fishSnapshotsService,
  frequencyInMinutes: 60 * 12,
  functions
});

export const rankingsService = createScheduledService('firebase', {
  callback: dispatchRankingsService,
  frequencyInMinutes: 60 * 24,
  functions
});
