import { Dispatch, FC } from "react";
import { IPlayingMode, DifficultyNames } from "../types";
import { handleTimeConversion } from "../utils";
import { ArrowLeftFromLine, Trash2 } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
interface Props {
  setPlayingMode: Dispatch<React.SetStateAction<IPlayingMode>>;
}

const ScoreBoard: FC<Props> = ({ setPlayingMode }) => {
  const { getItems, removeItemById } = useLocalStorage("match-score", []);
  const matchData = getItems();

  return (
    <>
      <div className="flex flex-col gap-2 lg:h-[400px] my-2 overflow-y-auto overflow-x-auto custom-scrollbar">
        {matchData.length === 0 ? (
          <h1 className="text-xl font-bold m-auto text-center text-text">
            No Matches Has Been Found
          </h1>
        ) : (
          <section className="overflow-x-auto overflow-y-auto custom-scrollbar w-[912px]">
            <div className="grid grid-cols-8 gap-1 bg-primary-lighter border border-secondary text-white">
              <div className="p-2 font-bold text-center flex justify-center items-center">
                Match Number
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Cities
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Difficulty
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Right Matches
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Wrong Matches
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Accuracy
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Time
              </div>
              <div className="p-2 border-l border-secondary font-bold text-center flex justify-center items-center">
                Delete
              </div>
            </div>

            <>
              {matchData.map((match, index) => (
                <div
                  key={match.id}
                  className="grid grid-cols-8 gap-1 bg-primary text-text-main border border-secondary my-1"
                >
                  <div className="p-2 text-center my-auto">#{index + 1}</div>
                  <div className="p-2 border-l border-secondary text-center my-auto">
                    {match.rightMatches}/{match.citiesLeft + match.rightMatches}
                  </div>
                  <div className="p-2 border-l border-secondary text-center my-auto">
                    {DifficultyNames[match.difficulty]}
                  </div>
                  <div className="p-2 border-l border-secondary text-center my-auto">
                    {match.rightMatches}
                  </div>
                  <div className="p-2 border-l border-secondary text-center my-auto">
                    {match.wrongMatches}
                  </div>
                  <div className="p-2 border-l border-secondary text-center my-auto">
                    {Math.round(match.accuracy)}%
                  </div>
                  <div className="p-2 border-l border-secondary text-center my-auto">
                    {handleTimeConversion(match.timeInS)}
                  </div>
                  <button
                    className="p-2 border-l border-secondary text-center flex justify-center items-center icon"
                    onClick={() => removeItemById(match.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </>
          </section>
        )}
      </div>
      <div className="flex justify-center gap-2 lg:bg-background-secondary p-2 mt-auto">
        <button
          className="max-w-[20rem] text-black w-full bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex gap-1 h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => setPlayingMode((prev) => ({ ...prev, isPlaying: false, isInMenu: true }))}
        >
          <div>
            <ArrowLeftFromLine />
          </div>
          <div>Back to menu</div>
        </button>
      </div>
    </>
  );
};

export default ScoreBoard;
