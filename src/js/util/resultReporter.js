export default function resultReporter(arg = '') {
  if (Array.isArray(arg)) {
    console.log('\n');
    arg.forEach(res => console.log(res));
  } else {
    console.log(`\n${arg}`);
  }
}
