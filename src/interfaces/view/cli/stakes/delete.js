import inquirer from 'inquirer';

export async function viewDeleteStake ({ listStakes, deleteStake }) {
  const stakes = await listStakes();
  const stakesIds = stakes.map(stake => stake.id);
  const choices = ['cancel'].concat(stakesIds);

  const questions = [{
    type: 'list',
    name: 'selectedStake',
    message: 'Select a stake',
    choices
  }];

  const answers = await inquirer.prompt(questions);

  if (answers.selectedStake === 'cancel') return;

  const stakeId = answers.selectedStake;

  await deleteStake(stakeId);

  console.info(`deleted stake with id ${stakeId}`);
  console.info('------------------------');
}
