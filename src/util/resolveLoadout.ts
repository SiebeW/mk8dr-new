import type { MarioKartData } from "../types/marioKartData";
import type {
    PlayerLoadout,
    ResolvedPlayerLoadout,
} from "../types/player";

export function resolveLoadout(
    loadout: PlayerLoadout,
    data: MarioKartData,
): ResolvedPlayerLoadout {
    const character = data.characters.find(
        character => character.id === loadout.characterId,
    );

    const body = data.vehicles.bodies.find(
        body => body.id === loadout.bodyId,
    );

    const tires = data.vehicles.tires.find(
        tires => tires.id === loadout.tiresId,
    );

    const glider = data.vehicles.gliders.find(
        glider => glider.id === loadout.gliderId,
    );

    if (!character || !body || !tires || !glider) {
        throw new Error("Could not resolve player loadout.");
    }

    const characterVariant =
        loadout.characterVariantId === null
            ? null
            : character.variants?.find(
                variant => variant.id === loadout.characterVariantId,
            ) ?? null;


    const characterImageUrl =
        characterVariant?.imageUrl ?? character.imageUrl;
    const characterDisplayName =
        characterVariant?.name ?? character.name;

    return {
        character,
        characterVariant,
        characterImageUrl,
        characterDisplayName,
        body,
        tires,
        glider,
    };
}