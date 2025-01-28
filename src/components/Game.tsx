import { FC, useEffect, useRef, useState } from "react";
import useGameStore from "../hooks/useGameStore";
import { shuffleArray } from "../utils/shuffleArray";
import { addButtonStyles, removeButtonStyles } from "../utils/updateButtonStyles";
import Alert from "./Alert";
import GameStatsDisplay from "./GameStatsDisplay";
import WinningScreen from "./WinningScreen";
import { calculateAccuracy } from "../utils/calculateAccuracy";
import { IStats } from "../types/IStats";

export type GameTuple = [string, string];

const difficultyLevelMap = {
  Easy: 3,
  Medium: 6,
  Hard: 9,
};

interface Props {
  gameData: GameTuple[];
}

const Game: FC<Props> = ({ gameData }) => {
  // useStates
  const [clickedGameItems, setClickedGameItems] = useState<string[]>([]);
  const [data, setData] = useState<GameTuple[]>(gameData);
  const [playerData, setPlayerData] = useState<string[]>([]);
  const [stats, setStats] = useState<IStats>({
    rightMatch: 0,
    wrongMatch: 0,
    citiesLeft: 0,
    accuracy: 0,
  });
  // refs
  const incrementRef = useRef(false);
  const isProcessingRef = useRef(false);
  // derived values
  const remainingLength = data.length;
  const totalLength = gameData.length;
  // zustand hooks
  const difficulty = useGameStore((s) => s.difficulty);

  // get new data if playerData is empty
  useEffect(() => {
    if (playerData.length === 0) {
      setPlayerData(() => getPlayerData(data));
    }
    setStats((prev) => ({ ...prev, citiesLeft: remainingLength }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData.length]);

  // prevents double increment in strict mode
  useEffect(() => {
    if (clickedGameItems.length === 0) {
      incrementRef.current = false;
    }
  }, [clickedGameItems]);

  const getPlayerData = (data: GameTuple[]): string[] => {
    if (data.length > 0) {
      const difficultyNumber = difficultyLevelMap[difficulty];
      const slicedData = data.slice(0, difficultyNumber);
      return shuffleArray(slicedData.flat());
    } else {
      return [];
    }
  };

  const areTuplesEqual = (tuple1: GameTuple, tuple2: GameTuple): boolean => {
    return (
      (tuple1[0] === tuple2[0] && tuple1[1] === tuple2[1]) ||
      (tuple1[0] === tuple2[1] && tuple1[1] === tuple2[0])
    );
  };

  const removePickedTupleFromPlayerData = (pickedTuple: GameTuple): void => {
    pickedTuple.map((item) =>
      setPlayerData((prevData) => prevData.filter((prev) => prev !== item))
    );
  };

  const removePickedTupleFromData = (pickedTuple: GameTuple): void => {
    setData((prevData) =>
      prevData.filter((tuple) => !areTuplesEqual(tuple, pickedTuple))
    );
  };

  const isPickedTupleRightMatch = (pickedTuple: GameTuple): boolean => {
    return data.some((tuple) => areTuplesEqual(tuple, pickedTuple));
  };

  const incrementRightMatches = () => {
    if (!incrementRef.current) {
      setStats((prev) => {
        const newRightMatches = prev.rightMatch + 1;
        const newAccuracy = calculateAccuracy(newRightMatches, prev.wrongMatch);
        return { ...prev, rightMatch: newRightMatches, accuracy: newAccuracy };
      });
      incrementRef.current = true;
    }
  };

  const incrementWrongMatches = () => {
    if (!incrementRef.current) {
      setStats((prev) => {
        const newWrongMatches = prev.wrongMatch + 1;
        const newAccuracy = calculateAccuracy(prev.rightMatch, newWrongMatches);
        return { ...prev, wrongMatch: newWrongMatches, accuracy: newAccuracy };
      });
      incrementRef.current = true;
    }
  };

  const handleItemClick = (item: string) => {
    if (isProcessingRef.current) return;

    setClickedGameItems((prev) => {
      if (prev.includes(item)) {
        removeButtonStyles([item], "clicked");
        return prev.filter((prevItem) => prevItem !== item);
      }

      addButtonStyles([item], "clicked");
      const newClickedGameItems = [...prev, item];

      if (newClickedGameItems.length === 2) {
        isProcessingRef.current = true;
        removeButtonStyles(newClickedGameItems, "clicked");
        const isValid = isPickedTupleRightMatch(newClickedGameItems as GameTuple);

        isValid
          ? addButtonStyles(newClickedGameItems, "valid")
          : addButtonStyles(newClickedGameItems, "invalid");

        setTimeout(() => {
          if (isValid) {
            removePickedTupleFromData(newClickedGameItems as GameTuple);
            removePickedTupleFromPlayerData(newClickedGameItems as GameTuple);
            removeButtonStyles(newClickedGameItems, "valid");
            incrementRightMatches();
          } else {
            removeButtonStyles(newClickedGameItems, "invalid");
            incrementWrongMatches();
          }
          isProcessingRef.current = false;
        }, 500);
        return [];
      }

      return newClickedGameItems;
    });
  };

  return (
    <div className="h-[400px]">
      <section className="flex flex-col justify-center gap-3 items-center mb-5">
        <GameStatsDisplay
          stats={stats}
          remainingLength={remainingLength}
          totalLength={totalLength}
        />
      </section>

      <section className="grid grid-wrap gap-4 items-center justify-center grid-cols-2 md:grid-cols-3">
        {playerData.map((item, index) => (
          <button
            className="h-[55px] min-w-[9rem] max-w-[20rem] rounded-md text-text-main border-2 border-secondary font-medium"
            data-item={item}
            key={index}
            onClick={() => handleItemClick(item)}
            disabled={isProcessingRef.current}
          >
            {item}
          </button>
        ))}
      </section>

      <WinningScreen remainingLength={remainingLength} />

      <Alert stats={stats} setStats={setStats} />
    </div>
  );
};

export default Game;
