import { FC } from "react";
import ConfettiComponent from "./Confetti";

interface Props {
  remainingLength: number;
}

const WinningScreen: FC<Props> = ({ remainingLength }) => {
  return (
    <>
      {remainingLength === 0 && (
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-xl text-text font-medium">
            Congratulations, You've Completed the Matching Game!
          </h1>
          <ConfettiComponent />
        </div>
      )}
    </>
  );
};

export default WinningScreen;
