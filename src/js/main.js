import resultReporter from './util/resultReporter';
import lint from './lint';

export default async function main(arg) {
  try { // eslint-disable-next-line
    if (!arg) throw new Error('\x1b[1m\x1b[31mA path is required.  It can be a file or a directory.\x1b[0m\n');
    resultReporter(await lint(arg));
  } catch (err) {
    console.log(err.message);
  }
}
