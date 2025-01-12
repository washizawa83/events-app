export const createRangeArray = (length: number) => {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`Error createArray requires positive integer`)
  }
  return [...Array(length)]
}
