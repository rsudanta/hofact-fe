export const formatedBadge = badge => {
  if (badge <= 99) {
    return 'Pemula';
  }
  if (badge < 200) {
    return 'Ambisius';
  }
  if (badge < 300) {
    return 'Hebat';
  }
  if (badge >= 300) {
    return 'Jenius';
  }
};
