import _ from "lodash";
import { roleBuilder } from "./role/builder";
import { roleHarvester } from "./role/harvester";
import { roleUpgrader } from "./role/upgrader";

/**
 * @todo: 用字典优化 switch
 */
export function loop(): void {
  clearMemory();
  towerAct();


  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester");
  console.log(`有 ${harvesters} 采掘者`);

  autoSpawn(harvesters);
  roleAct();

  for (const name in Game.rooms) {
    if (Object.prototype.hasOwnProperty.call(Game.rooms, name)) {
      const energy = Game.rooms[name].energyAvailable;
      console.log(`房间 ${name} 有 ${energy} 能源储备。`);
    }
  }

  console.log("All in peace.");
};

/**
 * @see {@link https://github.com/screepers/typed-screeps/issues/92 getObjectById 类型标注用法及讨论}
 */
function towerAct() {
  const towerID = "1ca20015155ec3f4d14a0bba" as Id<StructureTower>;
  const tower = Game.getObjectById(towerID);
  if (tower) {
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.hits < structure.hitsMax
    });
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    closestDamagedStructure && tower.repair(closestDamagedStructure);
    closestHostile && tower.attack(closestHostile);
  }
}

function clearMemory() {
  for (const name in Memory.creeps) {
    if (Object.prototype.hasOwnProperty.call(Memory.creeps, name)) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log(`清除内存中不存在的 creep： ${name}`);
      }
    }
  }
}

function autoSpawn(harvesters: Creep[]) {
  if (harvesters.length < 2 && !Game.spawns["Spawn1"].spawning) {
    const newName = `Harvester${Game.time}`;
    console.log(`生产新 Screep：${newName}`);
    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: "harvester" } });
  }

  if (Game.spawns["Spawn1"].spawning) {
    const spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
    Game.spawns["Spawn1"].room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns["Spawn1"].pos.x + 1,
      Game.spawns["Spawn1"].pos.y,
      { align: "left", opacity: 0.8 });
  }
}

function roleAct() {
  for (const name in Game.creeps) {
    if (Object.hasOwnProperty.call(Game.creeps, name)) {
      const creep = Game.creeps[name];

      switch (creep.memory.role) {
        case "harvester": {
          roleHarvester.run(creep);
          break;
        }
        case "upgrader": {
          roleUpgrader.run(creep);
          break;
        }

        case "builder": {
          roleBuilder.run(creep);
          break;
        }

        default: {
          break;
        }
      }
    }
  }
}
