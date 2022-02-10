import { harvest } from "./common";

export const roleHarvester: Role = {
  run: (creep) => {
    // 这样不会放一点，得到空闲就回去吗？
    if (creep.store.getFreeCapacity() > 0) {
      harvest(creep);
    }
    else {
      // 既然是 creep 的方法，会不会为 creep 位置优化？
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN)
            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          // Creep.moveTo() 是什么原理？
          creep.moveTo(targets[0]);
        }
      }
    }
  }
};
