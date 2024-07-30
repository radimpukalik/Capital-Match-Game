export const handleTimeConversion = (seconds: number): string => {
  const remainingSeconds = seconds % 3600;
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  const finalSeconds = Math.floor(remainingSeconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hours} : ${minutes} : ${finalSeconds}`;
};

export const calculateAccuracy = (rightMatches: number, wrongMatches: number): number => {
  const totalMatches = rightMatches + wrongMatches;
  return totalMatches > 0 ? (rightMatches / totalMatches) * 100 : 0;
};
