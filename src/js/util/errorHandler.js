export default function errorHandler(err, type = 'component') {
  if (/ENOENT/.test(err)) {
    return '\x1b[1m\x1b[31mFile or directory not found.  Please supply a valid path.\x1b[0m\n';
  }
  return `\x1b[1m\x1b[31mThere was an error with this ${type}: ${err}.\x1b[0m\n`;
}
