import firebase from 'firebase-functions-test';
import { testIfIntegration } from '../helpers';
import { rankingsService } from './services';

describe('dispatch rankings firebase function', () => {
  testIfIntegration()('sanity run just to check firebase function integrity', async () => {
    const test = firebase({
      projectId: process.env.GCLOUD_PROJECT
    });

    const wrappedSnapshotsService = test.wrap(rankingsService);
    const result = await wrappedSnapshotsService();

    expect(result).toBe(0);
  });
});
