/* eslint-disable max-len */
import test from 'ava';
import sinon from 'sinon';
// eslint-disable-next-line
import cli from '../cli';
// eslint-disable-next-line
import index from '../src/js/index';
import main from '../src/js/main';
import lint from '../src/js/lint';
import lintDirectory from '../src/js/lintDirectory';
import lintFile from '../src/js/lintFile';
import getComponentOptionsOrder from '../src/Priority_C/Comp_inst_opts_order/getComponentOptionsOrder';
import prettifyArray from '../src/Priority_C/Comp_inst_opts_order/prettifyArray';
import getProperOrder from '../src/Priority_C/Comp_inst_opts_order/getProperOrder';
import errorHandler from '../src/js/util/errorHandler';
import getComponentName from '../src/js/util/getComponentName';
import getComponentPropNames from '../src/js/util/getComponentPropNames';
import getScript from '../src/js/util/getScript';
import isFilePath from '../src/js/util/isFilePath';
import removeBuggyKeywords from '../src/js/util/removeBuggyKeywords';
import resultReporter from '../src/js/util/resultReporter';

function setupSpy() {
  sinon.spy(console, 'log');
}

function tearDownSpy() {
  console.log.restore();
}

test('test main - no arg - log error msg', (t) => {
  setupSpy();
  main();
  t.true(console.log.calledOnceWith('\x1b[1m\x1b[31mA path is required.  It can be a file or a directory.\x1b[0m\n'));
  tearDownSpy();
});

test('test lint - with file, opts in order', async (t) => {
  await t.is(await lint('./test/mock_files/fake_in_order.vue'),
    "\x1b[1m\x1b[32mThe \x1b[4mfake\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n");
});

test('test lint - with file, opts not in order', async (t) => {
  await t.is(await lint('./test/mock_files/fake_not_in_order.vue'),
    "\x1b[1m\x1b[31mThe recommended order for the \x1b[4mfake\x1b[0m\x1b[1m\x1b[31m component's options is: \x1b[7mname, extends, mixins, props, mounted.\x1b[0m\n");
});

test('test lint - with directory', async (t) => {
  await t.deepEqual(await lint('./test/mock_files/'),
    ["\x1b[1m\x1b[32mThe \x1b[4mfake\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n", "\x1b[1m\x1b[31mThe recommended order for the \x1b[4mfake\x1b[0m\x1b[1m\x1b[31m component's options is: \x1b[7mname, extends, mixins, props, mounted.\x1b[0m\n"]);
});

test('test lint - bad file path arg - log error msg', async (t) => {
  await t.is(await lint('./test/mock_files/junk_filename.vue'),
    '\x1b[1m\x1b[31mFile or directory not found.  Please supply a valid path.\x1b[0m\n');
});

test('test lintDirectory - bad directory path arg - log error msg', async (t) => {
  await t.is(await lintDirectory('./fake'),
    '\x1b[1m\x1b[31mFile or directory not found.  Please supply a valid path.\x1b[0m\n');
});

test('test lintFile - bad file path arg - log error msg', async (t) => {
  await t.is(await lintFile('./test/mock_files/junk_filename.vue'),
    '\x1b[1m\x1b[31mFile or directory not found.  Please supply a valid path.\x1b[0m\n');
});

test('test getComponentOptionsOrder - no name and empty props', (t) => {
  const obj = { componentName: '', componentProps: [] };
  t.is(getComponentOptionsOrder(obj),
    "\x1b[1m\x1b[32mThe \x1b[4m\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n");
});

test('test getComponentOptionsOrder - name with props in order', (t) => {
  const obj = { componentName: 'header', componentProps: ['name', 'props'] };
  t.is(getComponentOptionsOrder(obj),
    "\x1b[1m\x1b[32mThe \x1b[4mheader\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n");
});

test('test getComponentOptionsOrder - name with props in wrong order', (t) => {
  const obj = { componentName: 'header', componentProps: ['methods', 'name', 'props'] };
  t.is(getComponentOptionsOrder(obj),
    "\x1b[1m\x1b[31mThe recommended order for the \x1b[4mheader\x1b[0m\x1b[1m\x1b[31m component's options is: \x1b[7mname, props, methods.\x1b[0m\n");
});

test('test getComponentOptionsOrder - no arg', (t) => {
  t.is(getComponentOptionsOrder(),
    "\x1b[1m\x1b[32mThe \x1b[4m\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n");
});

test('test prettifyArray - no arg', (t) => {
  t.deepEqual(prettifyArray(), []);
});

test('test getProperOrder - no arg', (t) => {
  t.deepEqual(getProperOrder(), []);
});

test('test errorHandler - proper return on ENOENT', (t) => {
  const str = 'ENOENT';
  t.is(errorHandler(str), '\x1b[1m\x1b[31mFile or directory not found.  Please supply a valid path.\x1b[0m\n');
});

test('test errorHandler - proper return on other than ENOENT - default type', (t) => {
  const str = 'hello';
  t.is(errorHandler(str), 'There was an \x1b[7merror\x1b[0m with this component: hello.\n');
});

test('test errorHandler - proper return on other than ENOENT - supplied type', (t) => {
  const str = 'hello';
  const type = 'directory';
  t.is(errorHandler(str, type), 'There was an \x1b[7merror\x1b[0m with this directory: hello.\n');
});

test('test getComponentName - deepEqual', (t) => {
  const arr = [
    { key: { name: 'name' }, value: { value: 'header' } },
    { key: { name: 'props' }, value: { value: ['height', 'width'] } },
  ];
  t.deepEqual(getComponentName(arr), { componentName: 'header', componentProps: arr });
});

test('test getComponentName - no name', (t) => {
  const arr = [
    { key: { name: 'props' }, value: { value: ['height', 'width'] } },
  ];
  t.deepEqual(getComponentName(arr), { componentName: '<-    NO NAME FOUND    ->', componentProps: arr });
});

test('test getComponentName - is with JSON.stringify', (t) => {
  const arr = [
    { key: { name: 'name' }, value: { value: 'header' } },
    { key: { name: 'props' }, value: { value: ['height', 'width'] } },
  ];
  t.is(JSON.stringify(getComponentName(arr)),
    JSON.stringify({ componentName: 'header', componentProps: arr }));
});

// getComponentProperties only calls a 3rd party method so not testing here

test('test getComponentPropNames - deepEqual', (t) => {
  const obj = {
    componentName: 'header',
    componentProps: [
      { key: { name: 'name' }, value: { value: 'header' } },
      { key: { name: 'props' }, value: { value: ['height', 'width'] } },
    ],
  };
  t.deepEqual(getComponentPropNames(obj),
    { componentName: 'header', componentProps: ['name', 'props'] });
});

test('test getComponentPropNames - is with JSON.stringify', (t) => {
  const obj = {
    componentName: 'header',
    componentProps: [
      { key: { name: 'name' }, value: { value: 'header' } },
      { key: { name: 'props' }, value: { value: ['height', 'width'] } },
    ],
  };
  t.is(JSON.stringify(getComponentPropNames(obj)),
    JSON.stringify({ componentName: 'header', componentProps: ['name', 'props'] }));
});

test('test getScript', (t) => {
  const str = `
  <template>
  </template>

  <script>
  import comp2 from './comp2';

  export default {
    data() {
      return {}
    },
  };
  </script>

  <style scoped>
  </style>`;
  t.is(getScript(str), `export default {
    data() {
      return {}
    },
  };`);
});

test('test isFilePath - true', async (t) => {
  const file = './package.json';
  const bool = await isFilePath(file);
  t.true(bool);
});

test('test isFilePath - false', async (t) => {
  const file = './';
  const bool = await isFilePath(file);
  t.false(bool);
});

test('test isFilePath - ENOENT error', async (t) => {
  const file = './sample.js';
  const bool = await isFilePath(file);
  t.true(bool);
});

test('test isFilePath - other error - return undefined', async (t) => {
  const file = [];
  const bool = await isFilePath(file);
  t.is(bool, undefined);
});

test('test isFilePath - other error - should not throw', async (t) => {
  const file = [];
  await t.notThrowsAsync(isFilePath(file));
});

// pipe is a common FP utility so not testing here

test('test removeBuggyKeywords', (t) => {
  const str = 'helloawaitasyncimport world';
  t.is(removeBuggyKeywords(str), 'hello world');
});

test('test resultReporter - no arg - log newline', (t) => {
  setupSpy();
  resultReporter();
  t.true(console.log.calledOnceWith('\n'));
  tearDownSpy();
});

test('test resultReporter - str arg - log newline + str', (t) => {
  setupSpy();
  resultReporter('hello');
  t.true(console.log.calledOnceWith('\nhello'));
  tearDownSpy();
});

test('test resultReporter - arr arg - console.log called arr.length + 1(newline) times', (t) => {
  setupSpy();
  const arr = ['once\n', 'there\n', 'was\n'];
  resultReporter(arr);
  t.true(console.log.callCount === arr.length + 1);
  tearDownSpy();
});

test('test resultReporter - arr arg - log newline + each element', (t) => {
  setupSpy();
  const arr = ['once\n', 'there\n', 'was\n'];
  resultReporter(arr);
  t.true(console.log.calledWith('\n'));
  arr.forEach(i => t.true(console.log.calledWith(i)));
  tearDownSpy();
});
