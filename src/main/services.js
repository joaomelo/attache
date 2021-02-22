import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as functions from 'firebase-functions';
import { createScheduledService } from '../app/runtime';
import { dispatchTracksService } from './service-dispatch-tracks';
import { fishSnapshotsService } from './service-fish-snapshots';

export const snapshotsScheduledService = createScheduledService('firebase', {
  callback: fishSnapshotsService,
  frequencyInMinutes: 60 * 12,
  functions
});

export const tracksScheduledService = createScheduledService('firebase', {
  callback: dispatchTracksService,
  frequencyInMinutes: 60 * 12,
  functions
});
