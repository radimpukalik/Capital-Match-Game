import React, { FC, useEffect } from "react";
import * as Progress from "@radix-ui/react-progress";

interface Props {
  remainingPairs: number;
  totalPairs: number;
}

const ProgressDemo: FC<Props> = ({ remainingPairs, totalPairs }) => {
  const [progress, setProgress] = React.useState<number>(0);

  useEffect(() => {
    const newProgress = ((totalPairs - remainingPairs) / totalPairs) * 100;
    setProgress(newProgress);
  }, [remainingPairs, totalPairs]);

  return (
    <Progress.Root
      className="relative overflow-hidden bg-blackA6 rounded-full w-[300px] md:w-[600px] h-[35px]"
      style={{
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-secondary w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressDemo;
