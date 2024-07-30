import { Difficulty, IGameData, IMatchStats, IPlayingMode } from "./types";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import useFetchCountries from "./hooks/useFetchCountries";
import ScoreBoard from "./components/ScoreBoard";
import GameHeader from "./components/GameHeader";
import Game from "./components/Game";
import Menu from "./components/Menu";

const App = () => {
  const { countriesByRegion } = useFetchCountries();
  const [matchStats, setMatchStats] = useState<IMatchStats>({
    id: uuidv4(),
    citiesLeft: 0,
    difficulty: Difficulty.Medium,
    rightMatches: 0,
    wrongMatches: 0,
    accuracy: 0,
    timeInS: 0,
  });
  const [playingMode, setPlayingMode] = useState<IPlayingMode>({
    isInMenu: true,
    isPlaying: false,
  });
  const [gameData, setGameData] = useState<IGameData>({
    clickedRegions: [],
    clickedGameRegionData: {},
  });

  return (
    <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-screen">
      <main
        className={`lg:w-[960px] lg:bg-background-secondary shadow rounded-md h-screen mx-auto p-6
          ${
            matchStats.difficulty === 9 && playingMode.isPlaying
              ? "lg:max-h-[735px]"
              : "lg:max-h-[600px]"
          }
        `}
      >
        <GameHeader />

        {playingMode.isPlaying && (
          <Game
            matchStats={matchStats}
            setMatchStats={setMatchStats}
            setPlayingMode={setPlayingMode}
            gameData={gameData}
            setGameData={setGameData}
          />
        )}

        {playingMode.isInMenu && (
          <Menu
            setMatchStats={setMatchStats}
            setPlayingMode={setPlayingMode}
            gameData={gameData}
            setGameData={setGameData}
            countriesByRegion={countriesByRegion}
          />
        )}

        {!playingMode.isInMenu && !playingMode.isPlaying && (
          <ScoreBoard setPlayingMode={setPlayingMode} />
        )}
      </main>
    </div>
  );
};

export default App;
