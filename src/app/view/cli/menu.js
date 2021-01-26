import { Subject } from 'rxjs';
import inquirer from 'inquirer';

export function viewMenu () {
  const questions = [{
    type: 'list',
    name: 'menuList',
    message: 'What we are up to?',
    choices: [
      {
        name: 'List stakes',
        value: 'LIST_STAKES'
      },
      {
        name: 'Add stake',
        value: 'ADD_STAKE'
      },
      {
        name: 'Delete stake',
        value: 'DELETE_STAKE'
      },
      {
        name: 'List rankings',
        value: 'LIST_RANKINGS'
      },
      {
        name: 'Run a ranking cycle',
        value: 'CYCLE_RANK'
      },
      {
        name: 'Quit',
        value: 'QUIT'
      }
    ]
  }];

  const subject = new Subject();
  inquirer
    .prompt(questions)
    .then(answers => subject.next(answers.menuList));

  return subject;
};
