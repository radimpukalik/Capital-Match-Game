import { FC, useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { handleTimeConversion } from "../utils";

interface Props {
  gameDataPairs?: string[][];
  handleTimeUpdate: (time: number) => void;
}

const TimerComponent: FC<Props> = ({ gameDataPairs, handleTimeUpdate }) => {
  const [timeInS, setTimeInS] = useState(0);
  let intervalId: number | undefined;

  useEffect(() => {
    if (gameDataPairs && gameDataPairs.length !== 0) {
      intervalId = setInterval(() => {
        setTimeInS((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameDataPairs]);

  useEffect(() => {
    handleTimeUpdate(timeInS);
  }, [timeInS]);

  return (
    <div className="text-lg font-bold flex justify-center items-center">
      <Timer /> <span className="text-xl ml-2">{handleTimeConversion(timeInS)}</span>
    </div>
  );
};

export default TimerComponent;
