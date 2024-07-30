import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  itemArray: string[];
  setItem: any;
  startIndex?: number;
}

const SettingsButton: FC<Props> = ({ itemArray, setItem, startIndex }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(startIndex || 0);

  const handleNextClick = () => {
    const nextIndex = (currentItemIndex + 1) % itemArray.length;
    setCurrentItemIndex(nextIndex);
    setItem(itemArray[nextIndex]);
  };

  const handlePrevClick = () => {
    const prevIndex = (currentItemIndex - 1 + itemArray.length) % itemArray.length;
    setCurrentItemIndex(prevIndex);
    setItem(itemArray[prevIndex]);
  };

  return (
    <div className="flex w-[20rem] h-9 justify-between items-center overflow-hidden bg-primary rounded-md  ">
      <button
        className="text-text-main bg-primary-lighter px-2 h-full hover:bg-secondary"
        onClick={handlePrevClick}
      >
        <ChevronLeft />
      </button>
      <div className="font-medium">{itemArray[currentItemIndex]}</div>
      <button
        className="text-text-main bg-primary-lighter px-2 h-full hover:bg-secondary"
        onClick={handleNextClick}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default SettingsButton;
