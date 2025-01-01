const checkPassing = (techniqueScore: number, defenceScore: number) => {
  const defensviveRatio = defenceScore / (techniqueScore + defenceScore);
  return Math.random() < defensviveRatio ? false : true;
};
export { checkPassing };
