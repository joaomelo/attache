import firebase from 'firebase-functions-test';
import { testIfIntegration } from '../helpers';
import { snapshotsScheduledService } from './services';

describe('fish-snapshot firebase function', () => {
  testIfIntegration()('sanity run just to check firebase function integrity', async () => {
    const test = firebase({
      projectId: process.env.GCLOUD_PROJECT
    });

    const snapshotsService = test.wrap(snapshotsScheduledService);
    const result = await snapshotsService();

    expect(result).toBe(0);
  });
});
