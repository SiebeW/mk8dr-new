import type { Player as PlayerType } from "../types/player";

interface PlayerProps {
  player: PlayerType;
  onRandomize: () => void;
}

export function Player({ player, onRandomize }: PlayerProps) {
  return (
    <div>
      <h2>Player {player.id}</h2>

      <pre>
        {JSON.stringify(player.loadout, null, 2)}
      </pre>

      <button onClick={onRandomize}>
        Randomize
      </button>
    </div>
  );
}