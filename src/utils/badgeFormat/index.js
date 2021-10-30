export const formatedBadge = badge => {
  if (badge <= 99) {
    return 'Pemula';
  }
  if (badge > 99) {
    return 'Super';
  }
};
