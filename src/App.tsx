import { useState } from "react";

import { marioKartData } from "./assets/marioKartData";
import { Player } from "./components/Player";
import type { Player as PlayerType } from "./types/player";
import { randomizeLoadout } from "./util/randomizer";

function App() {
  const [player, setPlayer] = useState<PlayerType>({
    id: 1,
    loadout: null,
  });

  function randomizePlayer() {
    setPlayer({
      ...player,
      loadout: randomizeLoadout(marioKartData),
    });
  }

  return (
    <main>
      <Player
        player={player}
        onRandomize={randomizePlayer}
      />
    </main>
  );
}

export default App;