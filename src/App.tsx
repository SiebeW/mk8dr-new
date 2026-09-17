import { useEffect, useState } from "react";

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

const SETTINGS_STORAGE_KEY = "mkwrandomiser-settings";

interface SavedSettings {
  playerCount: number;
  options: RandomizerOptions;
  region: GameRegion;
}

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

function loadSavedSettings(): SavedSettings {
  const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!saved) {
    return {
      playerCount: 8,
      options: DEFAULT_RANDOMIZER_OPTIONS,
      region: "PAL",
    };
  }

  try {
    return JSON.parse(saved);
  } catch {
    return {
      playerCount: 8,
      options: DEFAULT_RANDOMIZER_OPTIONS,
      region: "PAL",
    };
  }
}

function App() {
  const [savedSettings] = useState<SavedSettings>(() =>
    loadSavedSettings(),
  );

  const [playerCount, setPlayerCount] = useState(
    savedSettings.playerCount,
  );

  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState<RandomizerOptions>(
    savedSettings.options,
  );

  const [region, setRegion] = useState<GameRegion>(
    savedSettings.region,
  );

  const [players, setPlayers] = useState<PlayerType[]>(() =>
    createPlayers(
      savedSettings.playerCount,
      savedSettings.options,
    ),
  );

  useEffect(() => {
    const settings: SavedSettings = {
      playerCount,
      options,
      region,
    };

    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(settings),
    );
  }, [playerCount, options, region]);

  function randomizeAllPlayers() {
    setPlayers(createPlayers(playerCount, options));
  }

  function handleOptionsChange(nextOptions: RandomizerOptions) {
    setOptions(nextOptions);
    setPlayers(createPlayers(playerCount, nextOptions));
  }

  function handlePlayerCountChange(nextPlayerCount: number) {
    setPlayerCount(nextPlayerCount);
    setPlayers(createPlayers(nextPlayerCount, options));
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
          onPlayerCountChange={handlePlayerCountChange}
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