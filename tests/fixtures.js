export const stakes = [
  {
    id: '87178090-383e-4780-a363-a076a6f952dd',
    frequency: 'daily',
    pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
    terms: ['cloud']
  },
  {
    id: 'd1584b65-7361-46ee-a807-e1a3ec0ddb33',
    frequency: 'weekly',
    pages: ['vuejs.org', 'reactjs.org', 'angular.io', 'svelte.dev'],
    terms: ['js front end library']
  }
];

export const rankings = [
  {
    id: '2b42f744-b9e1-41f5-acfe-8db4a54d1e97',
    page: 'www.company.com',
    term: 'service',
    position: 1,
    size: 100,
    when: new Date()
  },
  {
    id: 'fdb6df70-43d9-4388-a633-7d69555ece0b',
    page: 'www.competitor.com',
    term: 'service',
    position: -1,
    size: 100,
    when: new Date()
  }
];

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const snapshots = [
  {
    id: '304145c3-b694-431b-8f19-0ce6f678e3c0',
    term: 'cloud',
    when: new Date(1789, 6, 14),
    success: true,
    size: 2,
    result: ['www.some-page.com', 'www.another-page.net']
  },
  {
    id: 'd0efdeb3-919b-4bc6-aaff-c845afa5c55a',
    term: 'service my-city',
    when: yesterday,
    success: false,
    error: 'quota exceeded',
    size: 2
  },
  {
    id: '2fb25055-af54-4611-8dd9-e1cdc700929b',
    term: 'js front end library',
    when: new Date(),
    success: true,
    size: 2,
    result: ['www.some-page.com', 'www.another-page.net']
  },
  {
    id: '37ef78fb-6d23-48b6-adc9-336e1ce122f1',
    term: 'service',
    when: new Date(),
    success: true,
    size: 2,
    result: ['www.some-page.com', 'www.another-page.net']
  }
];
