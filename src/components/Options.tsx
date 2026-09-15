import type { RandomizerOptions } from "../util/randomizer";
import type { GameRegion } from "../util/localizeLoadout";

import "../styles/options.css";

interface OptionsProps {
  playerCount: number;
  options: RandomizerOptions;
  region: GameRegion;
  onPlayerCountChange: (playerCount: number) => void;
  onOptionsChange: (options: RandomizerOptions) => void;
  onRegionChange: (region: GameRegion) => void;
}

export function Options({
  playerCount,
  options,
  region,
  onPlayerCountChange,
  onOptionsChange,
  onRegionChange,
}: OptionsProps) {
  function toggleOption(
    option: keyof RandomizerOptions,
    value: boolean,
  ) {
    onOptionsChange({
      ...options,
      [option]: value,
    });
  }

  const onlyKartsEnabled =
    options.allowKarts &&
    !options.allowBikes &&
    !options.allowQuads;

  const onlyBikesEnabled =
    !options.allowKarts &&
    options.allowBikes &&
    !options.allowQuads;

  const onlyQuadsEnabled =
    !options.allowKarts &&
    !options.allowBikes &&
    options.allowQuads;

  return (
    <section className="options">
      <h2>Options</h2>

      <div className="options__player-count">
        <label htmlFor="player-count">
          Players: {playerCount}
        </label>

        <input
          id="player-count"
          type="range"
          min={1}
          max={8}
          step={1}
          value={playerCount}
          onChange={event =>
            onPlayerCountChange(Number(event.target.value))
          }
        />
      </div>

      <fieldset>
        <legend>Region</legend>

        <div className="options__button-row">
          <label className="options__toggle">
            <input
              type="radio"
              name="region"
              value="US"
              checked={region === "US"}
              onChange={() => onRegionChange("US")}
            />
            <span>US</span>
          </label>

          <label className="options__toggle">
            <input
              type="radio"
              name="region"
              value="PAL"
              checked={region === "PAL"}
              onChange={() => onRegionChange("PAL")}
            />
            <span>PAL</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Characters</legend>

        <label>
          <input
            type="checkbox"
            checked={options.allowMii}
            onChange={event =>
              toggleOption("allowMii", event.target.checked)
            }
          />
          Mii
        </label>
      </fieldset>

      <fieldset>
        <legend>Unlockables</legend>

        <label>
          <input
            type="checkbox"
            checked={options.allowGoldUnlockables}
            onChange={event =>
              toggleOption(
                "allowGoldUnlockables",
                event.target.checked,
              )
            }
          />
          Gold unlockables
        </label>
      </fieldset>

      <fieldset>
        <legend>DLC</legend>

        <div className="options__button-row">
          <label className="options__toggle">
            <input
              type="checkbox"
              checked={options.allowDlc4}
              onChange={event =>
                toggleOption("allowDlc4", event.target.checked)
              }
            />
            <span>Wave 4</span>
          </label>

          <label className="options__toggle">
            <input
              type="checkbox"
              checked={options.allowDlc5}
              onChange={event =>
                toggleOption("allowDlc5", event.target.checked)
              }
            />
            <span>Wave 5</span>
          </label>

          <label className="options__toggle">
            <input
              type="checkbox"
              checked={options.allowDlc6}
              onChange={event =>
                toggleOption("allowDlc6", event.target.checked)
              }
            />
            <span>Wave 6</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Vehicle Types</legend>

        <div className="options__button-row">
          <label className="options__toggle">
            <input
              type="checkbox"
              checked={options.allowKarts}
              disabled={onlyKartsEnabled}
              onChange={event =>
                toggleOption("allowKarts", event.target.checked)
              }
            />
            <span>Karts</span>
          </label>

          <label className="options__toggle">
            <input
              type="checkbox"
              checked={options.allowBikes}
              disabled={onlyBikesEnabled}
              onChange={event =>
                toggleOption("allowBikes", event.target.checked)
              }
            />
            <span>Bikes</span>
          </label>

          <label className="options__toggle">
            <input
              type="checkbox"
              checked={options.allowQuads}
              disabled={onlyQuadsEnabled}
              onChange={event =>
                toggleOption("allowQuads", event.target.checked)
              }
            />
            <span>Quads</span>
          </label>
        </div>
      </fieldset>
    </section>
  );
}