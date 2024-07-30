import { Dispatch, FC } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Difficulty, IGameData, IMatchStats, IPlayingMode } from "../types";
import { ArrowLeftFromLine } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setPlayingMode: Dispatch<React.SetStateAction<IPlayingMode>>;
  setMatchStats: Dispatch<React.SetStateAction<IMatchStats>>;
  matchStats: IMatchStats;
  setGameData: Dispatch<React.SetStateAction<IGameData>>;
}

const AlertDialogDemo: FC<Props> = ({ setPlayingMode, setMatchStats, matchStats, setGameData }) => {
  const { setItem } = useLocalStorage("match-score", []);

  const resetMatchStats = {
    id: uuidv4(),
    citiesLeft: 0,
    difficulty: Difficulty.Medium,
    rightMatches: 0,
    wrongMatches: 0,
    accuracy: 0,
    timeInS: 0,
  };

  const handleBackToMenuClick = () => {
    setItem(matchStats);
    setMatchStats(resetMatchStats);
    setGameData((prev) => ({ ...prev, clickedRegions: [] }));
    setPlayingMode((prev) => ({ ...prev, isPlaying: false, isInMenu: true }));
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
              If you choose to continue, you won't be able to return to your current game, but your
              current game stats will be saved to your score.
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
