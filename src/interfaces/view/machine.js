import { Machine } from 'xstate';

export const uiMachine = Machine({
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
