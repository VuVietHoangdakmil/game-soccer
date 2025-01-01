const ranDomItem = <T>(
  arr: T[]
): {
  item: T;
  index: number;
} => {
  const indexRandom = Math.floor(Math.random() * arr.length);
  return { item: arr[indexRandom], index: indexRandom };
};
export { ranDomItem };
