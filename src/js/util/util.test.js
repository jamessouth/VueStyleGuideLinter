import test from 'ava';
import errorHandler from './errorHandler';
import getComponentName from './getComponentName';
import getComponentPropNames from './getComponentPropNames';
import getScript from './getScript';
import isFilePath from './isFilePath';
import pipe from './pipe';
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
  const file = './sample.js';
  const bool = await isFilePath(file);
  t.true(bool);
});

test('test isFilePath - false', async t => {
  const file = './';
  const bool = await isFilePath(file);
  t.false(bool);
});

test('test isFilePath - error', async t => {
  const file = new Array();
  // const bool = await isFilePath(file);
  await t.throwsAsync(isFilePath(file));
});







test('test removeBuggyKeywords', t => {
  const str = 'helloawaitasyncimport world';
  t.is(removeBuggyKeywords(str), 'hello world');
});
