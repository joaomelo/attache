const baseInbox = process.env.DEFAULT_FROM_EMAIL.replace('@', '.');

export const stakes = [
  {
    id: '9164167b-6588-4dc1-a710-19a43a836df5',
    pages: ['cloud.google', 'firebase.google'],
    terms: ['cloud', 'serverless'],
    emails: [`${baseInbox}.a@maildrop.cc`, `${baseInbox}.b@maildrop.cc`]
  },
  {
    id: 'efcd94d9-cfe9-47bd-b128-57c03ca12a96',
    pages: ['aws.amazon.com'],
    terms: ['cloud'],
    emails: [`${baseInbox}.c@maildrop.cc`]
  }
];
