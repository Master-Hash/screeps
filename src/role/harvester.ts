export const roleHarvester: Role = {
  run: (creep) => {
    // 这样不会放一点，得到空闲就回去吗？
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
    else {
      if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        // Creep.moveTo() 是什么原理？
        creep.moveTo(Game.spawns['Spawn1']);
      }
    }
  }
};
