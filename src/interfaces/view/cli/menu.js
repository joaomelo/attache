import { Subject } from 'rxjs';
import inquirer from 'inquirer';

export function renderMenu () {
  const questions = [
    {
      type: 'list',
      name: 'menuList',
      message: 'What we are up to?',
      choices: [
        {
          name: 'List stakes',
          value: 'STAKES'
        },
        {
          name: 'List rankings',
          value: 'RANKINGS'
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
    }
  ];

  const subject = new Subject();
  inquirer
    .prompt(questions)
    .then(answers => subject.next(answers.menuList));

  return subject;
};
