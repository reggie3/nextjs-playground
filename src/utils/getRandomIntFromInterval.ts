export const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomNumberFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.random() * (max - min + 1) + min;
};
