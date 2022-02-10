interface Role {
  run(creep: Creep): void;
}

type Roles = "upgrader" | "harvester" | "builder";
