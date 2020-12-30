import inquirer from 'inquirer';

export async function viewListRankings ({ listRankings }) {
  const questions = [
    {
      type: 'input',
      name: 'filter',
      message: 'Filter pages by (press enter for all):'
    }
  ];

  const answers = await inquirer.prompt(questions);
  const filter = answers.filter;

  const allRankings = await listRankings();
  const filteredRankings = filter
    ? allRankings.filter(r => r.page.includes(filter))
    : allRankings;

  const sortByWhen = (a, b) => {
    if (a.when > b.when) return -1;
    if (a.when < b.when) return 1;
    return 0;
  };
  filteredRankings.sort(sortByWhen);
  const slicedRankings = filteredRankings.slice(0, 100);

  slicedRankings.forEach(ranking => console.info(ranking));
  console.info(`listed the first 100 of ${allRankings.length} total rankings`);
  console.info('------------------------');
}
