import { fromToday } from '../../helpers';
import { rankStake } from './stake';

describe('rankStake', () => {
  const stake = {
    id: '87178090-383e-4780-a363-a076a6f952dd',
    pages: ['cloud.google', 'firebase.google'],
    terms: ['cloud', 'serverless'],
    emails: ['some@email.com']
  };
  const snapshots = [
    {
      when: new Date(),
      success: true,
      term: 'serverless',
      result: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com']
    },
    {
      when: fromToday(-2),
      success: true,
      term: 'serverless',
      result: ['azure.microsoft.com', 'firebase.google.com', 'aws.amazon.com']
    },
    {
      when: fromToday(-2),
      term: 'cloud',
      success: false
    },
    {
      when: fromToday(-1),
      success: true,
      term: 'cloud',
      result: ['azure.microsoft.com', 'aws.amazon.com', 'cloud.google.com', 'firebase.google.com']
    }
  ];

  test('correctly calculate stake ranking', () => {
    const ranking = rankStake(stake, snapshots);

    expect(ranking).toEqual(
      expect.objectContaining({
        stake,
        terms: expect.any(Array)
      })
    );

    expect(ranking.terms).toHaveLength(2);
    expect(ranking.terms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          term: expect.any(String),
          pages: expect.any(Array)
        })
      ])
    );
  });
});
