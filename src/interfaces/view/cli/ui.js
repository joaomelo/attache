import { interpret } from 'xstate';
import { uiMachine } from '../machine';
import { viewMenu } from './menu';
import { viewListStakes, viewAddStake, viewDeleteStake } from './stakes';
import { viewListRankings, viewCycleRank } from './rankings';

export function initCliUi (dependencies) {
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
