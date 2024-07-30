import { Dispatch, FC, useEffect, useState } from "react";
import { CountriesByRegion, Difficulty, IGameData, IMatchStats, IPlayingMode } from "../types";
import SettingsButton from "./SettingsButton";
import { Eye, Play } from "lucide-react";
interface Props {
  setMatchStats: Dispatch<React.SetStateAction<IMatchStats>>;
  setPlayingMode: Dispatch<React.SetStateAction<IPlayingMode>>;
  gameData: IGameData;
  setGameData: Dispatch<React.SetStateAction<IGameData>>;
  countriesByRegion: CountriesByRegion;
}

const difficultyArray = ["Easy", "Medium", "Hard"];
const regions = ["Asia", "Africa", "Americas", "Europe", "Oceania"];

const difficultyMap: Record<string, Difficulty> = {
  Easy: Difficulty.Easy,
  Medium: Difficulty.Medium,
  Hard: Difficulty.Hard,
};

const Menu: FC<Props> = ({
  setMatchStats,
  setPlayingMode,
  gameData,
  setGameData,
  countriesByRegion,
}) => {
  const [totalCapitalsCount, setTotalCapitalsCount] = useState<number>(0);
  const [optionDifficulty, setOptionDifficulty] = useState<string>("Medium");
  const [showRegionNotSelected, setShowRegionNotSelected] = useState<boolean>(false);

  useEffect(() => {
    setMatchStats((prev) => ({ ...prev, difficulty: difficultyMap[optionDifficulty] }));
  }, [optionDifficulty]);

  useEffect(() => {
    setShowRegionNotSelected(false);
  }, [gameData.clickedRegions]);

  useEffect(() => {
    const accumulatedTotal = gameData.clickedRegions.reduce((acc, region) => {
      return acc + getCountForRegion(region);
    }, 0);
    setTotalCapitalsCount(accumulatedTotal);
  }, [gameData.clickedRegions]);

  const handlePlayButtonClick = () => {
    if (!gameData.clickedRegions.every((region) => region === "")) {
      const newRegionData = gameData.clickedRegions
        .map((clickedRegion) => countriesByRegion[clickedRegion])
        .filter(Boolean)
        .reduce((acc, regionData) => {
          return { ...acc, ...regionData };
        }, {});

      setGameData((prev) => ({ ...prev, clickedGameRegionData: newRegionData }));
      setPlayingMode((prev) => ({ ...prev, isInMenu: false, isPlaying: true }));
      setShowRegionNotSelected(false);
    } else {
      setShowRegionNotSelected(true);
    }
  };

  const getCountForRegion = (region: string) => {
    if (countriesByRegion && countriesByRegion[region]) {
      return Object.entries(countriesByRegion[region]).length;
    }
    return 0;
  };

  const handleClick = (region: string) => {
    setGameData((prevGameData) => {
      const { clickedRegions } = prevGameData;
      const newClickedRegions = clickedRegions.includes(region)
        ? clickedRegions.filter((prev) => prev !== region)
        : [...clickedRegions, region];

      return {
        ...prevGameData,
        clickedRegions: newClickedRegions,
      };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center lg:h-[80%] mt-10 lg:mt-0">
      <div className="flex flex-col items-center justify-center gap-6">
        <button
          className={`text-black w-[20rem] bg-white flex h-[35px] items-center justify-center rounded-[4px] px-8 font-medium leading-none outline-none focus:shadow-[0_0_0_2px]`}
          onClick={handlePlayButtonClick}
        >
          <div>
            <Play />
          </div>
          <div>
            <h2 className={`ml-3 text-black`}>Start playing</h2>
          </div>
        </button>

        <button
          className="text-text-main w-[20rem] bg-primary-lighter inline-flex h-[35px] items-center justify-center rounded-[4px] px-8 font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => {
            setPlayingMode((prev) => ({ ...prev, isInMenu: false, isPlaying: false }));
          }}
        >
          <div>
            <Eye />
          </div>
          <div>
            <h2 className="ml-3 text-text-main">View Score</h2>
          </div>
        </button>

        <h2 className="text-lg text-text">Choose the difficulty level:</h2>
        <SettingsButton itemArray={difficultyArray} setItem={setOptionDifficulty} startIndex={1} />

        {!showRegionNotSelected ? (
          <h2 className="text-lg text-text text-center">
            Select a region/s for your game: ({totalCapitalsCount})
          </h2>
        ) : (
          <h2 className="text-lg text-[#C9302C] text-center">
            You need to select a region first to start playing: ({totalCapitalsCount})
          </h2>
        )}

        <section className="flex justify-center items-center gap-5 w-full flex-wrap">
          {regions.map((region) => (
            <button
              className={`h-[55px] w-[9rem] rounded-md text-text-main border-2 border-secondary font-medium ${
                gameData.clickedRegions.includes(region) ? "bg-secondary" : ""
              }`}
              key={region}
              onClick={() => handleClick(region)}
            >
              {region} ({getCountForRegion(region)})
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Menu;
