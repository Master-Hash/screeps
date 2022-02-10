import { roleBuilder } from "./role/builder";
import { roleHarvester } from "./role/harvester";
import { roleUpgrader } from "./role/upgrader";

/**
 * @todo: 用字典优化 switch
 */
export function loop(): void {
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

      for (const name in Game.rooms) {
        if (Object.prototype.hasOwnProperty.call(Game.rooms, name)) {
          const energy = Game.rooms[name].energyAvailable;
          console.log(`房间 ${name} 有 ${energy} 能源储备。`);
        }
      }

      console.log("All in peace.");
    }
  }
};
