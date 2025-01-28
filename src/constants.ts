export const difficulties = ["Easy", "Medium", "Hard"] as const;
export type Difficulties = (typeof difficulties)[number];

export const regions = ["Asia", "Africa", "Americas", "Europe", "Oceania"] as const;
export type Regions = (typeof regions)[number];
