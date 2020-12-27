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
