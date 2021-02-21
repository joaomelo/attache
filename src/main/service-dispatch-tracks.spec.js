import firebase from 'firebase-functions-test';
import { testIfIntegration } from '../helpers';
import { tracksScheduledService } from './services';

describe('dispatch tracks reports firebase function', () => {
  testIfIntegration()('sanity run just to check firebase function integrity', async () => {
    const test = firebase({
      projectId: process.env.GCLOUD_PROJECT
    });

    const tracksService = test.wrap(tracksScheduledService);
    const result = await tracksService();

    expect(result).toBe(0);
  });
});
