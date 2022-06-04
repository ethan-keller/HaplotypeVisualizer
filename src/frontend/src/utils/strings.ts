export const truncateIfLongerThan = (s: string, n: number) => {
  if (s.length > n) {
    return s.substring(0, n) + '...';
  } else {
    return s;
  }
};

export const capitalizeFirstLetter = (s: string) => {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
