import type { MarioKartData } from "../types/marioKartData";
import type { PlayerLoadout } from "../types/player";

export interface RandomizerOptions {
  allowMii: boolean;
  allowDlc4: boolean;
  allowDlc5: boolean;
  allowDlc6: boolean;
  allowGoldUnlockables: boolean;
  allowKarts: boolean;
  allowBikes: boolean;
  allowQuads: boolean;
}

export const DEFAULT_RANDOMIZER_OPTIONS: RandomizerOptions = {
  allowMii: false,
  allowDlc4: true,
  allowDlc5: true,
  allowDlc6: true,
  allowGoldUnlockables: true,
  allowKarts: true,
  allowBikes: true,
  allowQuads: true,
};

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function selectItems<T>(items: T[], count: number): T[] {
  if (items.length === 0) {
    throw new Error("Cannot select from an empty pool.");
  }

  const selected: T[] = [];

  while (selected.length < count) {
    const shuffled = shuffle(items);

    for (const item of shuffled) {
      selected.push(item);

      if (selected.length === count) {
        break;
      }
    }
  }

  return selected;
}

function getAvailableCharacters(
  characters: MarioKartData["characters"],
  options: RandomizerOptions,
) {
  return characters.filter(character => {
    if (character.id === "mii" && !options.allowMii) {
      return false;
    }

    if (character.dlc === 4 && !options.allowDlc4) {
      return false;
    }

    if (character.dlc === 5 && !options.allowDlc5) {
      return false;
    }

    if (character.dlc === 6 && !options.allowDlc6) {
      return false;
    }

    return true;
  });
}

function getAvailableBodies(
  bodies: MarioKartData["vehicles"]["bodies"],
  options: RandomizerOptions,
) {
  return bodies.filter(body => {
    if (body.type === "Kart" && !options.allowKarts) {
      return false;
    }

    if (body.type === "Bike" && !options.allowBikes) {
      return false;
    }

    if (body.type === "ATV" && !options.allowQuads) {
      return false;
    }

    if (
      body.id === "gold-standard-kart" &&
      !options.allowGoldUnlockables
    ) {
      return false;
    }

    return true;
  });
}

function getAvailableTires(
  tires: MarioKartData["vehicles"]["tires"],
  options: RandomizerOptions,
) {
  return tires.filter(tire => {
    if (
      tire.id === "gold-standard" &&
      !options.allowGoldUnlockables
    ) {
      return false;
    }

    return true;
  });
}

function getAvailableGliders(
  gliders: MarioKartData["vehicles"]["gliders"],
  options: RandomizerOptions,
) {
  return gliders.filter(glider => {
    if (
      glider.id === "gold-glider" &&
      !options.allowGoldUnlockables
    ) {
      return false;
    }

    return true;
  });
}

function getRandomCharacterVariant(
  character: MarioKartData["characters"][number],
  options: RandomizerOptions,
) {
  const variants =
    character.variants?.filter(variant => {
      if (
        variant.id === "gold" &&
        !options.allowGoldUnlockables
      ) {
        return false;
      }

      return true;
    }) ?? [];

  return variants.length > 0 ? randomItem(variants) : null;
}

export function randomizeLoadout(
  data: MarioKartData,
  options: RandomizerOptions = DEFAULT_RANDOMIZER_OPTIONS,
): PlayerLoadout {
  const characters = getAvailableCharacters(
    data.characters,
    options,
  );

  const bodies = getAvailableBodies(
    data.vehicles.bodies,
    options,
  );

  const tires = getAvailableTires(
    data.vehicles.tires,
    options,
  );

  const gliders = getAvailableGliders(
    data.vehicles.gliders,
    options,
  );

  if (characters.length === 0) {
    throw new Error("No characters are available.");
  }

  if (bodies.length === 0) {
    throw new Error("No vehicle bodies are available.");
  }

  if (tires.length === 0) {
    throw new Error("No tires are available.");
  }

  if (gliders.length === 0) {
    throw new Error("No gliders are available.");
  }

  const character = randomItem(characters);
  const body = randomItem(bodies);
  const tire = randomItem(tires);
  const glider = randomItem(gliders);

  const characterVariant = getRandomCharacterVariant(
    character,
    options,
  );

  return {
    characterId: character.id,
    characterVariantId: characterVariant?.id ?? null,
    bodyId: body.id,
    tiresId: tire.id,
    gliderId: glider.id,
  };
}

export function randomizePlayers(
  data: MarioKartData,
  playerCount: number,
  options: RandomizerOptions = DEFAULT_RANDOMIZER_OPTIONS,
): PlayerLoadout[] {
  const characters = getAvailableCharacters(
    data.characters,
    options,
  );

  const bodies = getAvailableBodies(
    data.vehicles.bodies,
    options,
  );

  const tires = getAvailableTires(
    data.vehicles.tires,
    options,
  );

  const gliders = getAvailableGliders(
    data.vehicles.gliders,
    options,
  );

  if (characters.length === 0) {
    throw new Error("No characters are available.");
  }

  if (bodies.length === 0) {
    throw new Error("No vehicle bodies are available.");
  }

  if (tires.length === 0) {
    throw new Error("No tires are available.");
  }

  if (gliders.length === 0) {
    throw new Error("No gliders are available.");
  }

  const selectedCharacters = selectItems(
    characters,
    playerCount,
  );

  const selectedBodies = selectItems(
    bodies,
    playerCount,
  );

  const selectedTires = selectItems(
    tires,
    playerCount,
  );

  const selectedGliders = selectItems(
    gliders,
    playerCount,
  );

  return selectedCharacters.map((character, index) => {
    const characterVariant = getRandomCharacterVariant(
      character,
      options,
    );

    return {
      characterId: character.id,
      characterVariantId: characterVariant?.id ?? null,
      bodyId: selectedBodies[index].id,
      tiresId: selectedTires[index].id,
      gliderId: selectedGliders[index].id,
    };
  });
}