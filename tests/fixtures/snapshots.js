import { fromToday } from '../../src/helpers';

export const snapshots = [
  {
    id: '304145c3-b694-431b-8f19-0ce6f678e3c0',
    term: 'cloud',
    when: fromToday(-10),
    result: ['aws.amazon.com', 'azure.microsoft.com', 'cloud.google.com', 'firebase.google.com'],
    success: true,
    size: 3
  },
  {
    id: 'd0efdeb3-919b-4bc6-aaff-c845afa5c55a',
    term: 'cloud',
    when: fromToday(-1),
    result: ['azure.microsoft.com', 'aws.amazon.com', 'cloud.google.com', 'firebase.google.com'],
    success: true,
    size: 3
  },
  {
    id: '2fb25055-af54-4611-8dd9-e1cdc700929b',
    term: 'cloud',
    when: new Date(),
    success: false,
    error: 'quota exceeded'
  },
  {
    id: 'ddcb6512-103b-429c-9fe4-6f2bba15297c',
    term: 'serverless',
    when: fromToday(-2),
    result: ['firebase.google.com', 'azure.microsoft.com', 'aws.amazon.com'],
    size: 3,
    success: true
  },
  {
    id: '37ef78fb-6d23-48b6-adc9-336e1ce122f1',
    term: 'serverless',
    when: fromToday(0),
    success: true,
    size: 3,
    result: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com']
  }
];
