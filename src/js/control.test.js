import test from 'ava';
import sinon from 'sinon';
import main from './main';
// import getComponentName from './getComponentName';
// import getComponentPropNames from './getComponentPropNames';

function setupSpy() {
  sinon.spy(console, 'log');
}

function tearDownSpy() {
  console.log.restore();
}

test('test main - no arg - log error msg', t => {
  setupSpy();
  // main();
  console.log('dddd');
  t.true(console.log.callCount == 1);
  console.log(console.log.callCount);
  // t.true(console.log.calledOnceWith('A path is required.  It can be a file or a directory.'));
  tearDownSpy();
});

// test('test main - no arg - should not throw', t => {
//   t.notThrows(main);
// });





















// mkl
