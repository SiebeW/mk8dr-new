import type { VehicleBody, VehiclePart } from "../types/marioKartData";
import type { ResolvedPlayerLoadout } from "../types/player";

export type GameRegion = "US" | "PAL";

export interface LocalizedPlayerLoadout {
  character: ResolvedPlayerLoadout["character"];
  characterVariant: ResolvedPlayerLoadout["characterVariant"];
  characterImageUrl: ResolvedPlayerLoadout["characterImageUrl"];
  characterDisplayName: ResolvedPlayerLoadout["characterDisplayName"];
  body: VehicleBody & {
    displayName: string;
    displayType: string;
  };

  tires: VehiclePart & {
    displayName: string;
  };

  glider: VehiclePart & {
    displayName: string;
  };
}

function localizeTireName(name: string, region: GameRegion): string {
  if (region === "PAL") {
    switch (name) {
      case "Standard":
        return "Normal";

      case "Wood":
        return "Wooden";

      case "Blue Standard":
        return "Normal Blue";

      case "Hot Monster":
        return "Funky Monster";

      case "Gold Standard":
        return "Gold";

      default:
        return name;
    }
  }

  return name;
}

function localizeBodyName(name: string, region: GameRegion): string {
  if (region === "PAL" && name === "Sneeker") {
    return "Bounder";
  }

  return name;
}

function localizeBodyType(
  type: VehicleBody["type"],
  region: GameRegion,
): string {
  if (region === "PAL" && type === "ATV") {
    return "Quad";
  }

  return type;
}

export function localizeLoadout(
  loadout: ResolvedPlayerLoadout,
  region: GameRegion,
): LocalizedPlayerLoadout {
  return {
    character: loadout.character,
    characterVariant: loadout.characterVariant,
    characterImageUrl: loadout.characterImageUrl,
    characterDisplayName: loadout.characterDisplayName,

    body: {
      ...loadout.body,
      displayName: localizeBodyName(loadout.body.name, region),
      displayType: localizeBodyType(loadout.body.type, region),
    },

    tires: {
      ...loadout.tires,
      displayName: localizeTireName(loadout.tires.name, region),
    },

    glider: {
      ...loadout.glider,
      displayName: loadout.glider.name,
    },
  };
}
