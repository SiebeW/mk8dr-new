import type {
  Character,
  CharacterVariant,
  VehicleBody,
  VehiclePart,
} from "./marioKartData";

export interface PlayerLoadout {
  characterId: string;
  characterVariantId: string | null;

  bodyId: string;
  tiresId: string;
  gliderId: string;
}

export interface ResolvedPlayerLoadout {
  character: Character;
  characterVariant: CharacterVariant | null;
  characterImageUrl: string;
  characterDisplayName: string;

  body: VehicleBody;
  tires: VehiclePart;
  glider: VehiclePart;
}

export interface Player {
  id: number;
  loadout: PlayerLoadout | null;
}