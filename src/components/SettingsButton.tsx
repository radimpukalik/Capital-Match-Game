import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props<T extends ReactNode> {
  itemsArray: readonly T[];
  startIndex?: number;
  onItemChange: (newItem: T) => void;
}

const SettingsButton = <T extends ReactNode>({
  itemsArray,
  startIndex,
  onItemChange,
}: Props<T>) => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(startIndex || 0);

  const handleNextClick = () => {
    const nextIndex = (currentItemIndex + 1) % itemsArray.length;
    setCurrentItemIndex(nextIndex);
    onItemChange(itemsArray[nextIndex]);
  };

  const handlePrevClick = () => {
    const prevIndex = (currentItemIndex - 1 + itemsArray.length) % itemsArray.length;
    setCurrentItemIndex(prevIndex);
    onItemChange(itemsArray[prevIndex]);
  };

  return (
    <div className="flex w-[20rem] h-9 justify-between items-center overflow-hidden bg-primary rounded-md  ">
      <button
        className="text-text-main bg-primary-lighter px-2 h-full hover:bg-secondary"
        onClick={handlePrevClick}
      >
        <ChevronLeft />
      </button>
      <div className="font-medium">{itemsArray[currentItemIndex]}</div>
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
