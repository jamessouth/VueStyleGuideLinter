import test from 'ava';
import sinon from 'sinon';
import errorHandler from './errorHandler';
import getComponentName from './getComponentName';
import getComponentPropNames from './getComponentPropNames';
import getScript from './getScript';
import isFilePath from './isFilePath';
import removeBuggyKeywords from './removeBuggyKeywords';
import resultReporter from './resultReporter';

test('test errorHandler - proper return on ENOENT', t => {
  const str = 'ENOENT';
  t.is(errorHandler(str), 'File or directory not found.  Please supply a valid path.');
});

test('test errorHandler - proper return on other than ENOENT - default type', t => {
  const str = 'hello';
  t.is(errorHandler(str), 'There was an error with this component: hello.\n');
});

test('test errorHandler - proper return on other than ENOENT - supplied type', t => {
  const str = 'hello';
  const type = 'directory';
  t.is(errorHandler(str, type), 'There was an error with this directory: hello.\n');
});

test('test getComponentName - deepEqual', t => {
  const arr = [
    {key: {name: 'name'}, value: {value: 'header'}},
    {key: {name: 'props'}, value: {value: ['height', 'width']}}
  ];
  t.deepEqual(getComponentName(arr), {componentName: 'header', componentProps: arr});
});

test('test getComponentName - is with JSON.stringify', t => {
  const arr = [
    {key: {name: 'name'}, value: {value: 'header'}},
    {key: {name: 'props'}, value: {value: ['height', 'width']}}
  ];
  t.is(JSON.stringify(getComponentName(arr)), JSON.stringify({componentName: 'header', componentProps: arr}));
});

// getComponentProperties only calls a 3rd party method so not testing here

test('test getComponentPropNames - deepEqual', t => {
  const obj = {
    componentName: 'header',
    componentProps: [
      {key: {name: 'name'}, value: {value: 'header'}},
      {key: {name: 'props'}, value: {value: ['height', 'width']}}
    ]
  };
  t.deepEqual(getComponentPropNames(obj), {componentName: 'header', componentProps: ['name', 'props']});
});

test('test getComponentPropNames - is with JSON.stringify', t => {
  const obj = {
    componentName: 'header',
    componentProps: [
      {key: {name: 'name'}, value: {value: 'header'}},
      {key: {name: 'props'}, value: {value: ['height', 'width']}}
    ]
  };
  t.is(JSON.stringify(getComponentPropNames(obj)), JSON.stringify({componentName: 'header', componentProps: ['name', 'props']}));
});

test('test getScript', t => {
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

test('test isFilePath - true', async t => {
  const file = './package.json';
  const bool = await isFilePath(file);
  t.true(bool);
});

test('test isFilePath - false', async t => {
  const file = './';
  const bool = await isFilePath(file);
  t.false(bool);
});

test('test isFilePath - ENOENT error', async t => {
  const file = './sample.js';
  const bool = await isFilePath(file);
  t.true(bool);
});

test('test isFilePath - other error - return undefined', async t => {
  const file = new Array();
  const bool = await isFilePath(file);
  t.is(bool, undefined);
});

test('test isFilePath - other error - should not throw', async t => {
  const file = new Array();
  await t.notThrowsAsync(isFilePath(file));
});

// pipe is a common FP utility so not testing here

test('test removeBuggyKeywords', t => {
  const str = 'helloawaitasyncimport world';
  t.is(removeBuggyKeywords(str), 'hello world');
});

function setupSpy() {
  sinon.spy(console, 'log');
}

function tearDownSpy() {
  console.log.restore();
}

test('test resultReporter - no arg - log newline', t => {
  setupSpy();
  resultReporter();
  t.true(console.log.calledOnceWith('\n'));
  tearDownSpy();
});

test('test resultReporter - str arg - log newline + str', t => {
  setupSpy();
  resultReporter('hello');
  t.true(console.log.calledOnceWith(`\nhello`));
  tearDownSpy();
});

test('test resultReporter - arr arg - console.log called arr.length + 1(newline) times', t => {
  setupSpy();
  const arr = ['once\n', 'there\n', 'was\n'];
  resultReporter(arr);
  t.true(console.log.callCount === arr.length + 1);
  tearDownSpy();
});

test('test resultReporter - arr arg - log newline + each element', t => {
  setupSpy();
  const arr = ['once\n', 'there\n', 'was\n'];
  resultReporter(arr);
  t.true(console.log.calledWith('\n'));
  arr.forEach(i => t.true(console.log.calledWith(i)));
  tearDownSpy();
});
