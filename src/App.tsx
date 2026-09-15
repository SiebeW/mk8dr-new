import { useState } from "react";

import { marioKartData } from "./assets/marioKartData";

import { OptionsToggle } from "./components/OptionsToggle";
import { Options } from "./components/Options";
import { Player } from "./components/Player";

import "./styles/app.css";

import type { Player as PlayerType } from "./types/player";

import {
  DEFAULT_RANDOMIZER_OPTIONS,
  randomizePlayers,
  type RandomizerOptions,
} from "./util/randomizer";

import { resolveLoadout } from "./util/resolveLoadout";

import {
  localizeLoadout,
  type GameRegion,
} from "./util/localizeLoadout";

function createPlayers(
  playerCount: number,
  options: RandomizerOptions,
): PlayerType[] {
  const loadouts = randomizePlayers(
    marioKartData,
    playerCount,
    options,
  );

  return loadouts.map((loadout, index) => ({
    id: index + 1,
    loadout,
  }));
}

function App() {
  const [playerCount, setPlayerCount] = useState(8);
  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState<RandomizerOptions>(
    DEFAULT_RANDOMIZER_OPTIONS,
  );

  const [region, setRegion] = useState<GameRegion>("PAL");

  const [players, setPlayers] = useState<PlayerType[]>(() =>
    createPlayers(8, DEFAULT_RANDOMIZER_OPTIONS),
  );

  function randomizeAllPlayers() {
    setPlayers(createPlayers(playerCount, options));
  }

  function handleOptionsChange(nextOptions: RandomizerOptions) {
    setOptions(nextOptions);
    setPlayers(createPlayers(playerCount, nextOptions));
  }

  return (
    <main>
      <header className="app-header">
        <OptionsToggle
          isOpen={showOptions}
          onToggle={() =>
            setShowOptions(current => !current)
          }
        />

        <button
          className="randomize-button"
          type="button"
          onClick={randomizeAllPlayers}
        >
          Randomize
        </button>
      </header>

      {showOptions && (
        <Options
          playerCount={playerCount}
          options={options}
          region={region}
          onPlayerCountChange={setPlayerCount}
          onOptionsChange={handleOptionsChange}
          onRegionChange={setRegion}
        />
      )}

      <div className="players">
        {players.map(player => (
          <Player
            key={player.id}
            player={player}
            loadout={
              player.loadout
                ? localizeLoadout(
                  resolveLoadout(
                    player.loadout,
                    marioKartData,
                  ),
                  region,
                )
                : null
            }
          />
        ))}
      </div>
    </main>
  );
}

export default App;