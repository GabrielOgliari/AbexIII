export const isEmpty = (value: any): boolean => {
  return (
    value === '' ||
    value === false ||
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  );
};
