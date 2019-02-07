// bug in cherow parser used by abstract-syntax-tree chokes on some 'async/await' and
// dynamic 'import'.  according to cherow #237 this is being fixed in an upcoming release.
// workaround now is to replace with empty string since we are only interested in the top-
// level options of a component, not the underlying code.
export default function removeBuggyKeywords(str) {
  return str.replace(/async|await|import/g, '');
}
