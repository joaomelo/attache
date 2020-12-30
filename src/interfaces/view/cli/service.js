import { viewMenu } from './menu';
import { viewListStakes, viewAddStake, viewDeleteStake } from './stakes';
import { viewListRankings, viewCycleRank } from './rankings';
import { Machine, interpret } from 'xstate';

let dependencies;

const uiMachine = Machine({
  id: 'attache',
  initial: 'menu',
  states: {
    menu: {
      invoke: {
        id: 'renderMenu',
        src: viewMenu
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
        src: () => viewListStakes({ listStakes: dependencies.listStakes }),
        onDone: { target: 'menu' }
      }
    },
    addStake: {
      invoke: {
        id: 'addStake',
        src: () => viewAddStake({ addStake: dependencies.addStake }),
        onDone: { target: 'menu' }
      }
    },
    deleteStake: {
      invoke: {
        id: 'deleteStake',
        src: () => viewDeleteStake({
          listStakes: dependencies.listStakes,
          deleteStake: dependencies.deleteStake
        }),
        onDone: { target: 'menu' }
      }
    },
    listRankings: {
      invoke: {
        id: 'listRankings',
        src: () => viewListRankings({ listRankings: dependencies.listRankings }),
        onDone: { target: 'menu' }
      }
    },
    cycleRank: {
      invoke: {
        id: 'cycleRank',
        src: () => viewCycleRank({ cycleRank: dependencies.cycleRank }),
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
