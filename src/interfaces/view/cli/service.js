import { renderMenu } from './menu';
import { listStakes, addStake, deleteStake } from './stakes';
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
        LIST_STAKES: 'listStakes',
        ADD_STAKE: 'addStake',
        DELETE_STAKE: 'deleteStake',
        LIST_RANKINGS: 'listRankings',
        CYCLE_RANK: 'cycleRank',
        QUIT: 'quit'
      }
    },
    listStakes: {
      invoke: {
        id: 'listStakes',
        src: () => listStakes({ listStakes: dependencies.listStakes }),
        onDone: { target: 'menu' }
      }
    },
    addStake: {
      invoke: {
        id: 'addStake',
        src: () => addStake({ addStake: dependencies.addStake }),
        onDone: { target: 'menu' }
      }
    },
    deleteStake: {
      invoke: {
        id: 'deleteStake',
        src: () => deleteStake({
          listStakes: dependencies.listStakes,
          deleteStake: dependencies.deleteStake
        }),
        onDone: { target: 'menu' }
      }
    },
    listRankings: {
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
