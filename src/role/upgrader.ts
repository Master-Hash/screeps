import { harvest } from "./common";

export const roleUpgrader: Role = {
  run: (creep: Creep) => {
    if (creep.store[RESOURCE_ENERGY] === 0) {
      harvest(creep);
    }
    // 房间里面怎么会没有控制器？
    else if (creep.room.controller) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
};
