module.exports.loop = (() => {
  for (const name in Game.creeps) {
    if (Object.hasOwnProperty.call(Game.creeps, name)) {
      const creep = Game.creeps[name];

      if (creep.store.getFreeCapacity() > 0) {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
        }
      }
      else {
        if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.spawns['Spawn1']);
          // 这样不会放一点，得到空闲就回去吗？
        }
      }
      console.log("All in peace.");
    }
  }
});
