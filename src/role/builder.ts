import { harvest } from "./common";

export const roleBuilder: Role = {
  run: (creep) => {
    // 切换状态
    // 既不能一修就采，也不能一采就修，因此有必要储存状态
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say("🚧 build");
    }

    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        // targets 到底是什么顺序？
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
      // 如果又采满了，又没有工地，就摸鱼。
    }
    else {
      harvest(creep);
    }
  }
};
