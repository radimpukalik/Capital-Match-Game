import { SquareCheck, SquareX } from "lucide-react";
import { FC } from "react";
import ProgressDemo from "./ProgressDemo";
import TimerComponent from "./TimerComponent";
import { IStats } from "../types/IStats";

interface Props {
  stats: IStats;
  remainingLength: number;
  totalLength: number;
}

const GameStatsDisplay: FC<Props> = ({ stats, remainingLength, totalLength }) => {
  return (
    <>
      <div className="relative mt-5">
        <ProgressDemo remainingPairs={remainingLength} totalPairs={totalLength} />
        <div
          className={`absolute text-text-main  top-1 font-bold left-[45%] right-[55%]`}
        >
          {stats.rightMatch}/{totalLength}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="text-lg font-bold flex justify-center items-center">
          <SquareCheck color="#28A745" />
          <span className="text-xl ml-2 text-[#28A745]">{stats.rightMatch}</span>
        </div>
        <TimerComponent isRunning={stats.citiesLeft !== 0} />
        <div className="text-lg font-bold flex justify-center items-center">
          <SquareX color="#C9302C" />
          <span className="text-xl ml-2 text-[#C9302C]">{stats.wrongMatch}</span>
        </div>
      </div>
    </>
  );
};

export default GameStatsDisplay;
