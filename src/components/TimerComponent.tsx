import { FC, useEffect, useState } from "react";
import { Timer } from "lucide-react";
import useGameStore from "../hooks/useGameStore";
import { handleTimeConversion } from "../utils/handleTimeConversion";

interface Props {
  isRunning: boolean;
}

const TimerComponent: FC<Props> = ({ isRunning }) => {
  const [timeInS, setTimeInS] = useState(0);
  const setTime = useGameStore((s) => s.setTime);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeInS((prev) => {
          const newTime = prev + 1;
          return newTime;
        });
        setTime(timeInS + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, setTime, timeInS]);

  return (
    <div className="text-lg font-bold flex justify-center items-center">
      <Timer /> <span className="text-xl ml-2">{handleTimeConversion(timeInS)}</span>
    </div>
  );
};

export default TimerComponent;
