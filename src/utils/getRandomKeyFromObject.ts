export const getRandomKeyFromObject = (obj: object) => {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};
