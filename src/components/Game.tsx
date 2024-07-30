import { Dispatch, FC, useEffect, useState } from "react";
import { IGameData, IMatchStats, IObject, IPlayingMode } from "../types";
import Confetti from "./Confetti";
import ProgressDemo from "./ProgressDemo";
import { SquareCheck, SquareX } from "lucide-react";
import TimerComponent from "./TimerComponent";
import Alert from "./Alert";
import { calculateAccuracy } from "../utils";

interface IProps {
  matchStats: IMatchStats;
  setMatchStats: Dispatch<React.SetStateAction<IMatchStats>>;
  setPlayingMode: Dispatch<React.SetStateAction<IPlayingMode>>;
  gameData: IGameData;
  setGameData: Dispatch<React.SetStateAction<IGameData>>;
}

const Game: FC<IProps> = ({ matchStats, setMatchStats, setPlayingMode, gameData, setGameData }) => {
  const [buttonColor, setButtonColor] = useState<IObject>({});
  const [clickedGameItems, setClickedGameItems] = useState<string[]>([]);
  const [gameDataPairs, setGameDataPairs] = useState<string[][]>([]);
  const [gameArray, setGameArray] = useState<string[]>([]);

  useEffect(() => {
    setGameDataPairs(Object.entries(gameData.clickedGameRegionData));
  }, [gameData.clickedGameRegionData]);

  useEffect(() => {
    setMatchStats((prev) => ({ ...prev, citiesLeft: gameDataPairs.length }));

    if (gameArray.length === 0 && matchStats.difficulty !== null) {
      const reducedGamePairsArray = gameDataPairs.slice(0, matchStats.difficulty);
      const flattendAndSortedArray = reducedGamePairsArray.flat().sort(() => Math.random() - 0.5);
      setGameArray(flattendAndSortedArray);
    }
  }, [gameDataPairs, matchStats.difficulty]);

  useEffect(() => {
    checkForRightMatch();
  }, [clickedGameItems]);

  const handleGameItemClick = (gameItem: string): void => {
    if (clickedGameItems.length < 2) {
      setClickedGameItems((prevItem) =>
        prevItem.includes(gameItem)
          ? prevItem.filter((item) => item !== gameItem)
          : [...prevItem, gameItem]
      );
      const newColor = clickedGameItems.includes(gameItem) ? "" : "#3B4CCA";
      updateButtonColor(newColor, gameItem);
    }
  };

  type TColor = "#C9302C" | "#28A745" | "#3B4CCA" | "";
  const updateButtonColor = (color: TColor, firstItem: string, secondItem?: string) => {
    setButtonColor(
      (prevColor): IObject => ({
        ...prevColor,
        [firstItem]: color,
        ...(secondItem && { [secondItem]: color }),
      })
    );
  };

  const incrementRightMatch = (): void => {
    setMatchStats((prev) => {
      const newRightMatches = prev.rightMatches + 1;
      const newAccuracy = calculateAccuracy(newRightMatches, prev.wrongMatches);

      return {
        ...prev,
        rightMatches: newRightMatches,
        accuracy: newAccuracy,
      };
    });
  };

  const incrementWrongMatch = (): void => {
    setMatchStats((prev) => {
      const newWrongMatches = prev.wrongMatches + 1;
      const newAccuracy = calculateAccuracy(prev.rightMatches, newWrongMatches);

      return {
        ...prev,
        wrongMatches: newWrongMatches,
        accuracy: newAccuracy,
      };
    });
  };

  const removePairAtIndex = (index: number): void => {
    setGameDataPairs((prevPairs) => {
      const updatedPairs = [...prevPairs];
      const [first, second] = updatedPairs[index];

      const updatedGameArray = gameArray.filter((city) => city !== first && city !== second);
      setGameArray(updatedGameArray);

      updatedPairs.splice(index, 1);
      return updatedPairs;
    });
  };

  const checkForRightMatch = (): void => {
    if (clickedGameItems.length == 2) {
      const [firstItem, secondItem] = clickedGameItems;
      const match = gameDataPairs.find(
        ([item1, item2]) =>
          (item1 === firstItem && item2 === secondItem) ||
          (item1 === secondItem && item2 === firstItem)
      );

      let matchIndex = -1;
      if (match) {
        matchIndex = gameDataPairs.findIndex((pair) => pair === match);
        updateButtonColor("#28A745", firstItem, secondItem), incrementRightMatch();
      } else {
        updateButtonColor("#C9302C", firstItem, secondItem), incrementWrongMatch();
      }

      setTimeout(() => {
        setClickedGameItems([]);
        match ? removePairAtIndex(matchIndex) : updateButtonColor("", firstItem, secondItem);
      }, 1000);
    }
  };

  const handleTimeUpdate = (time: number) => {
    setMatchStats((prev) => ({ ...prev, timeInS: time }));
  };

  return (
    <div className="h-[400px]">
      <header className="flex flex-col justify-center gap-3 items-center mb-5">
        <div className="relative mt-5">
          <ProgressDemo
            remainingPairs={gameDataPairs.length}
            totalPairs={Object.entries(gameData.clickedGameRegionData).length}
          />
          <div className={`absolute text-text-main  top-1 font-bold left-[45%] right-[55%]`}>
            {matchStats.rightMatches}/{Object.entries(gameData.clickedGameRegionData).length}
          </div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="text-lg font-bold flex justify-center items-center">
            <SquareCheck color="#28A745" />
            <span className="text-xl ml-2 text-[#28A745]">{matchStats.rightMatches}</span>
          </div>
          <TimerComponent gameDataPairs={gameDataPairs} handleTimeUpdate={handleTimeUpdate} />
          <div className="text-lg font-bold flex justify-center items-center">
            <SquareX color="#C9302C" />
            <span className="text-xl ml-2 text-[#C9302C]">{matchStats.wrongMatches}</span>
          </div>
        </div>
      </header>

      <section className="grid grid-wrap gap-4 items-center justify-center grid-cols-2 md:grid-cols-3">
        {gameArray.map((gameItem, index) => (
          <button
            className="h-[55px] min-w-[9rem] max-w-[20rem] rounded-md text-text-main border-2 border-secondary font-medium"
            style={{ backgroundColor: buttonColor[gameItem] || "" }}
            key={index}
            onClick={() => handleGameItemClick(gameItem)}
          >
            {gameItem}
          </button>
        ))}
      </section>

      <section>
        {gameDataPairs.length === 0 && (
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-xl text-text font-medium">
              Congratulations, You've Completed the Matching Game!
            </h1>
            <Confetti />
          </div>
        )}
      </section>

      <Alert
        setPlayingMode={setPlayingMode}
        setMatchStats={setMatchStats}
        matchStats={matchStats}
        setGameData={setGameData}
      />
    </div>
  );
};

export default Game;
