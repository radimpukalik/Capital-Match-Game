import { Eye, Play } from "lucide-react";
import { FC, useCallback, useState } from "react";
import useGameStore from "../hooks/useGameStore";
import { shuffleArray } from "../utils/shuffleArray";
import SettingsButton from "./SettingsButton";
import { CountriesByRegion } from "../hooks/useFetchCountries";
import { difficulties, Difficulties, regions, Regions } from "../constants";

interface Props {
  fetchedData: CountriesByRegion;
}

const Menu: FC<Props> = ({ fetchedData }) => {
  const setDifficulty = useGameStore((s) => s.setDifficulty);
  const setPlayingMode = useGameStore((s) => s.setPlayingMode);
  const setGameData = useGameStore((s) => s.setGameData);

  const [selectedRegions, setSelectedRegions] = useState<Regions[]>([]);
  const [regionNotSelected, setRegionNotSelected] = useState<boolean>(false);

  const totalStatesCount = selectedRegions.reduce((acc, region) => {
    return acc + getCountForRegion(region);
  }, 0);

  function getCountForRegion(region: string): number {
    if (fetchedData && fetchedData[region]) {
      return Object.entries(fetchedData[region]).length;
    }
    return 0;
  }

  const handlePlayButtonClick = (): void => {
    if (selectedRegions.length === 0) return setRegionNotSelected(true);

    const newGameData = selectedRegions
      .map((selectedRegion) => fetchedData[selectedRegion])
      .filter(Boolean)
      .reduce((acc, regionData) => {
        return { ...acc, ...regionData };
      }, {});
    setGameData(shuffleArray(Object.entries(newGameData)));

    setPlayingMode("isPlaying");
  };

  const handleViewButtonClick = (): void => {
    setPlayingMode("isInScoreboard");
  };

  const handleRegionButtonClick = (region: Regions): void => {
    setSelectedRegions((prev) => {
      if (prev.includes(region)) {
        return prev.filter((r) => r !== region);
      }
      setRegionNotSelected(false);
      return [...prev, region];
    });
  };

  const changeDifficulty = useCallback(
    (difficulty: Difficulties) => {
      setDifficulty(difficulty);
    },
    [setDifficulty]
  );

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
          onClick={handleViewButtonClick}
        >
          <div>
            <Eye />
          </div>
          <div>
            <h2 className="ml-3 text-text-main">View Score</h2>
          </div>
        </button>

        <h2 className="text-lg text-text">Choose the difficulty level:</h2>
        <SettingsButton<Difficulties>
          itemsArray={difficulties}
          startIndex={1}
          onItemChange={changeDifficulty}
        />

        {!regionNotSelected ? (
          <h2 className="text-lg text-text text-center">
            Select a region/s for your game: ({totalStatesCount})
          </h2>
        ) : (
          <h2 className="text-lg text-[#C9302C] text-center">
            You need to select a region first to start playing: ({totalStatesCount})
          </h2>
        )}

        <section className="flex justify-center items-center gap-5 w-full flex-wrap">
          {regions.map((region) => (
            <button
              className={`h-[55px] w-[9rem] rounded-md text-text-main border-2 border-secondary font-medium ${
                selectedRegions.includes(region) ? "bg-secondary" : ""
              }`}
              key={region}
              onClick={() => handleRegionButtonClick(region)}
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
