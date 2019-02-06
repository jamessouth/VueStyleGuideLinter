export default function getScript(str) {
  return str.split(/<\/?script>/)[1].replace(/[\s\S]+(?=export)/, '').trim();
}
