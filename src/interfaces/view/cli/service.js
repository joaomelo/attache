import { viewMenu } from './menu';
import { viewListStakes, viewAddStake, viewDeleteStake } from './stakes';
import { viewListRankings, viewCycleRank } from './rankings';
import { Machine, interpret } from 'xstate';

const uiMachine = Machine({
  id: 'attache',
  initial: 'menu',
  states: {
    menu: {
      invoke: {
        id: 'menuInvoke',
        src: 'viewMenuService'
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
        id: 'listStakesInvoke',
        src: 'viewListStakesService',
        onDone: { target: 'menu' }
      }
    },
    addStake: {
      invoke: {
        id: 'addStakeInvoke',
        src: 'viewAddStakeService',
        onDone: { target: 'menu' }
      }
    },
    deleteStake: {
      invoke: {
        id: 'deleteStakeInvoke',
        src: 'viewDeleteStakeService',
        onDone: { target: 'menu' }
      }
    },
    listRankings: {
      invoke: {
        id: 'listRankingsInvoke',
        src: 'viewListRankingsService',
        onDone: { target: 'menu' }
      }
    },
    cycleRank: {
      invoke: {
        id: 'cycleRankInvoke',
        src: 'viewCycleRankService',
        onDone: { target: 'menu' }
      }
    },
    quit: {
      type: 'final'
    }
  }
});

export function initUiService (dependencies) {
  const {
    listStakes,
    addStake,
    deleteStake,
    listRankings,
    cycleRank
  } = dependencies;

  const services = {
    viewMenuService: viewMenu,
    viewListStakesService: () => viewListStakes({ listStakes }),
    viewAddStakeService: () => viewAddStake({ addStake }),
    viewDeleteStakeService: () => viewDeleteStake({ listStakes, deleteStake }),
    viewListRankingsService: () => viewListRankings({ listRankings }),
    viewCycleRankService: () => viewCycleRank({ cycleRank })
  };

  const uiMachineWithServices = uiMachine.withConfig({ services });
  const uiService = interpret(uiMachineWithServices);
  uiService.start();
}
