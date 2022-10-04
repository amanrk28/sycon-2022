export const stringSorting = (a: string, b: string) => {
  if (!a) {
    return -1;
  }
  if (!b) {
    return -1;
  }
  const A = a.toLowerCase();
  const B = b.toLowerCase();

  if (A < B) {
    return -1;
  }

  if (A > B) {
    return 1;
  }

  return 0;
};
