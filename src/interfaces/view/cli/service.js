import { renderMenu } from './menu';
import { listStakes } from './stakes';
import { listRankings, runCycleRank } from './rankings';
import { Machine, interpret } from 'xstate';

let dependencies;

const uiMachine = Machine({
  id: 'attache',
  initial: 'menu',
  states: {
    menu: {
      invoke: {
        id: 'renderMenu',
        src: renderMenu
      },
      on: {
        STAKES: 'stakes',
        RANKINGS: 'rankings',
        CYCLE_RANK: 'cycleRank',
        QUIT: 'quit'
      }
    },
    stakes: {
      invoke: {
        id: 'listStakes',
        src: () => listStakes({ queryStakes: dependencies.queryStakes }),
        onDone: { target: 'menu' }
      }
    },
    rankings: {
      invoke: {
        id: 'listRankings',
        src: () => listRankings({ queryRankings: dependencies.queryRankings }),
        onDone: { target: 'menu' }
      }
    },
    cycleRank: {
      invoke: {
        id: 'cycleRank',
        src: () => runCycleRank({ cycleRank: dependencies.cycleRank }),
        onDone: { target: 'menu' }
      }
    },
    quit: {
      type: 'final'
    }
  }
});

export function initUiService (config) {
  dependencies = { ...config };

  const uiService = interpret(uiMachine);
  uiService.start();
}
