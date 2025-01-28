import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ArrowLeftFromLine } from "lucide-react";
import React, { Dispatch, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import useGameStore from "../hooks/useGameStore";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IcompleteStats, IStats } from "../types/IStats";
import MaxWidthWrapper from "./MaxWidthWrapper";

interface Props {
  stats: IStats;
  setStats: Dispatch<React.SetStateAction<IStats>>;
}

const AlertDialogDemo: FC<Props> = ({ stats, setStats }) => {
  const { setItem } = useLocalStorage("match-score", []);
  const setPlayingMode = useGameStore((s) => s.setPlayingMode);
  const newTime = useGameStore((s) => s.time);
  const newDifficulty = useGameStore((s) => s.difficulty);

  const endOfGame = () => {
    const finalGameStats: IcompleteStats = {
      id: uuidv4(),
      time: newTime,
      difficulty: newDifficulty,
      ...stats,
    };

    setItem(finalGameStats);
  };

  const clearGame = () => {
    setStats({
      rightMatch: 0,
      wrongMatch: 0,
      citiesLeft: 0,
      accuracy: 0,
    });
  };

  const handleBackToMenuClick = async () => {
    endOfGame();
    clearGame();
    setPlayingMode("isInMenu");
  };

  return (
    <MaxWidthWrapper className="flex content-start justify-center mt-8">
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button className="max-w-[20rem] text-black w-full bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex gap-1 h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
            <div>
              <ArrowLeftFromLine />
            </div>
            <div>Back to menu</div>
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-blackA8 data-[state=open]:animate-overlayShow fixed inset-0" />
          <AlertDialog.Content className="data-[state=open]:animate-contentShow bg-[#35363A] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <AlertDialog.Title className="text-white m-0 text-[17px] font-medium">
              Warning!
            </AlertDialog.Title>
            <AlertDialog.Description className="text-mauve mt-4 mb-5 text-[15px] leading-normal">
              If you choose to continue, you won't be able to return to your current
              game, but your current game stats will be saved to your score.
            </AlertDialog.Description>
            <div className="flex justify-end gap-[25px]">
              <AlertDialog.Cancel asChild>
                <button className="text-black bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="text-black bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  onClick={handleBackToMenuClick}
                >
                  Continue (back to menu)
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </MaxWidthWrapper>
  );
};

export default AlertDialogDemo;
