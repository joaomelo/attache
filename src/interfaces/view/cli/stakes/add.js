import inquirer from 'inquirer';

export async function addStake ({ saveStake }) {
  const questions = [
    {
      type: 'input',
      name: 'pages',
      message: 'What pages to rank (separated by comma)?'
    },
    {
      type: 'input',
      name: 'terms',
      message: 'What terms to cross the pages against (separated by comma)?'
    }
  ];

  const answers = await inquirer.prompt(questions);

  const breakList = wordList => wordList.split(',').map(word => word.trim());

  const pages = breakList(answers.pages);
  const terms = breakList(answers.terms);
  const stake = { pages, terms };

  await saveStake(stake);

  console.info('stake saved:');
  console.info(stake);
  console.info('------------------------');
}
