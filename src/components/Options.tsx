import type { RandomizerOptions } from "../util/randomizer";
import type { GameRegion } from "../util/localizeLoadout";

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
        <section>
            <h2>Options</h2>

            <div>
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

                <label>
                    <input
                        type="radio"
                        name="region"
                        value="US"
                        checked={region === "US"}
                        onChange={() => onRegionChange("US")}
                    />
                    US
                </label>

                <label>
                    <input
                        type="radio"
                        name="region"
                        value="PAL"
                        checked={region === "PAL"}
                        onChange={() => onRegionChange("PAL")}
                    />
                    PAL
                </label>
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

                <label>
                    <input
                        type="checkbox"
                        checked={options.allowDlc4}
                        onChange={event =>
                            toggleOption("allowDlc4", event.target.checked)
                        }
                    />
                    Wave 4
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={options.allowDlc5}
                        onChange={event =>
                            toggleOption("allowDlc5", event.target.checked)
                        }
                    />
                    Wave 5
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={options.allowDlc6}
                        onChange={event =>
                            toggleOption("allowDlc6", event.target.checked)
                        }
                    />
                    Wave 6
                </label>
            </fieldset>

            <fieldset>
                <legend>Vehicle Types</legend>

                <label>
                    <input
                        type="checkbox"
                        checked={options.allowKarts}
                        disabled={onlyKartsEnabled}
                        onChange={event =>
                            toggleOption("allowKarts", event.target.checked)
                        }
                    />
                    Karts
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={options.allowBikes}
                        disabled={onlyBikesEnabled}
                        onChange={event =>
                            toggleOption("allowBikes", event.target.checked)
                        }
                    />
                    Bikes
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={options.allowQuads}
                        disabled={onlyQuadsEnabled}
                        onChange={event =>
                            toggleOption("allowQuads", event.target.checked)
                        }
                    />
                    Quads
                </label>
            </fieldset>
        </section>
    );
}