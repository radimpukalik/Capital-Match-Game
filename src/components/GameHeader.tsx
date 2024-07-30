import { FC } from "react";

const GameHeader: FC = () => {
  return (
    <footer className="w-full h-[80x] text-center flex gap-2 flex-col pb-4 items-center justify-center border-b-2 border-text">
      <h1 className="text-4xl text-text-main">Capital Match Game</h1>
      <p className="text-lg text-text">
        Test your geography knowledge by matching capitals to their respective countries!
      </p>
    </footer>
  );
};

export default GameHeader;
