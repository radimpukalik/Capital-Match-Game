export const calculateAccuracy = (
  rightMatches: number,
  wrongMatches: number
): number => {
  const totalMatches = rightMatches + wrongMatches;
  return totalMatches > 0 ? (rightMatches / totalMatches) * 100 : 0;
};
