import Game from "./components/Game";
import GameHeader from "./components/GameHeader";
import Menu from "./components/Menu";
import ScoreBoard from "./components/ScoreBoard";
import useFetchCountries from "./hooks/useFetchCountries";
import useGameStore from "./hooks/useGameStore";

const App = () => {
  const playingMode = useGameStore((s) => s.playingMode);
  const difficulty = useGameStore((s) => s.difficulty);

  const { countriesByRegion } = useFetchCountries();
  const gameData = useGameStore((s) => s.gameData);

  return (
    <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-screen">
      <main
        className={`lg:w-[960px] lg:bg-background-secondary shadow rounded-md h-screen mx-auto p-6
          ${
            difficulty === "Hard" && playingMode === "isPlaying"
              ? "lg:max-h-[735px]"
              : "lg:max-h-[600px]"
          }
        `}
      >
        <GameHeader />

        {playingMode === "isPlaying" && <Game gameData={gameData} />}

        {playingMode === "isInMenu" && <Menu fetchedData={countriesByRegion} />}

        {playingMode === "isInScoreboard" && <ScoreBoard />}
      </main>
    </div>
  );
};

export default App;
