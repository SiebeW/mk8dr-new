import type { MarioKartData } from "../types/marioKartData";
import type { PlayerLoadout } from "../types/player";

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomizeLoadout(data: MarioKartData): PlayerLoadout {
  const character = randomItem(data.characters);
  const body = randomItem(data.vehicles.bodies);
  const tires = randomItem(data.vehicles.tires);
  const glider = randomItem(data.vehicles.gliders);

  const characterVariant =
    character.variants && character.variants.length > 0
      ? randomItem(character.variants)
      : null;

  return {
    characterId: character.id,
    characterVariantId: characterVariant?.id ?? null,
    bodyId: body.id,
    tiresId: tires.id,
    gliderId: glider.id,
  };
}