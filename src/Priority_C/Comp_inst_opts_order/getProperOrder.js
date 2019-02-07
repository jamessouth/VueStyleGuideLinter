import COMP_INST_OPTS_ORDER from './COMP_INST_OPTS_ORDER';

export default function getProperOrder(arr = []) {
  const optArray = [...arr];
  return optArray.sort((a, b) => COMP_INST_OPTS_ORDER.indexOf(a) - COMP_INST_OPTS_ORDER.indexOf(b));
}
