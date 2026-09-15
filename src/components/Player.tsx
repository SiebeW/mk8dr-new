import type {
    Player as PlayerType,

} from "../types/player";
import type { LocalizedPlayerLoadout } from "../util/localizeLoadout";

import "../styles/player.css";

interface PlayerProps {
    player: PlayerType;
    loadout: LocalizedPlayerLoadout | null;
}

const PLAYER_COLORS = [
    "#e52521",
    "#1976d2",
    "#f5c400",
    "#2e9e44",
    "#f28c28",
    "#35bde6",
    "#ed6aa7",
    "#8b5fc7",
];

export function Player({ player, loadout }: PlayerProps) {
    return (
        <article
            className="player-card"
            style={{
                "--player-color": PLAYER_COLORS[player.id - 1],
            } as React.CSSProperties}
        >
            <span className="player-card__number">
                {player.id}
            </span>

            {loadout && (
                <div className="player-card__loadout">
                    <div className="player-card__images">
                        <img
                            className="player-card__character"
                            src={loadout.characterImageUrl}
                            alt={loadout.characterDisplayName}
                        />

                        <img
                            src={loadout.body.imageUrl}
                            alt={loadout.body.name}
                        />

                        <img
                            src={loadout.tires.imageUrl}
                            alt={loadout.tires.name}
                        />

                        <img
                            src={loadout.glider.imageUrl}
                            alt={loadout.glider.name}
                        />
                    </div>

                    <p className="player-card__description">
                        {loadout.characterDisplayName} ·{" "}
                        {loadout.body.name} ·{" "}
                        {loadout.tires.name} ·{" "}
                        {loadout.glider.name}
                    </p>
                </div>
            )}
        </article>
    );
}