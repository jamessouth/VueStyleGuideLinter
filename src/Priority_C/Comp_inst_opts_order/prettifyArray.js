export default function prettifyArray(arr = []) {
  return arr.map((el, i) => (i === 0 ? el : ` ${el}`));
}
