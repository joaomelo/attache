import firebase from 'firebase-functions-test';
import { stakes, snapshots } from '../../tests/fixtures';
import { createStakesCollection } from '../domain/stakes';
import { createSnapshotsCollection } from '../domain/snapshots';
import { testIfIntegration } from '../helpers';
import { tracksScheduledService } from './services';

jest.mock('../domain/stakes/collection');
jest.mock('../domain/snapshots/collection');

describe('dispatch tracks reports firebase function', () => {
  testIfIntegration()('sanity run just to check firebase function integrity', async () => {
    createStakesCollection.mockReturnValue({ queryAll: () => stakes });
    createSnapshotsCollection.mockReturnValue({ querySuccessfulLastDays: () => snapshots.filter(s => s.success) });

    const test = firebase({
      projectId: process.env.GCLOUD_PROJECT
    });

    const tracksService = test.wrap(tracksScheduledService);
    const result = await tracksService();

    expect(result).toBe(3);
  });
});
