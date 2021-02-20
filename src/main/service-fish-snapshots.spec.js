import firebase from 'firebase-functions-test';
import { testIfIntegration } from '../helpers';
import { snapshotsService } from './services';

describe('fish-snapshot firebase function', () => {
  testIfIntegration()('sanity run just to check firebase function integrity', async () => {
    const test = firebase({
      projectId: process.env.GCLOUD_PROJECT
    });

    const wrappedSnapshotsService = test.wrap(snapshotsService);
    const result = await wrappedSnapshotsService();

    expect(result).toBe(0);
  });
});
