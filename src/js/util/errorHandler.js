export default function errorHandler(err, type = 'component') {
  if (/ENOENT/.test(err)) {
    return 'File or directory not found.  Please supply a valid path.';
  }
  return `There was an error with this ${type}: ${err}.\n`;
}
