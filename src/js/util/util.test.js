import test from 'ava';
import removeBuggyKeywords from './removeBuggyKeywords';

test('test removeBuggyKeywords', t => {
  const str = 'hello await async import world';
  t.is(removeBuggyKeywords(str), 'hello world');
});
