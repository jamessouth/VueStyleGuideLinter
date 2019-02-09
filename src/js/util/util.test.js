import test from 'ava';
import errorHandler from './errorHandler';
import getComponentName from './getComponentName';
import getComponentProperties from './getComponentProperties';
import getComponentPropNames from './getComponentPropNames';
import getScript from './getScript';
import isFilePath from './isFilePath';
import pipe from './pipe';
import removeBuggyKeywords from './removeBuggyKeywords';
import resultReporter from './resultReporter';






test('test removeBuggyKeywords', t => {
  const str = 'helloawaitasyncimport world';
  t.is(removeBuggyKeywords(str), 'hello world');
});
