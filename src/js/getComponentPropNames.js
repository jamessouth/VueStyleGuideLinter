export default function getComponentPropNames(obj) {
  const propNames = obj.componentProps.map(propName => propName.key.name);
  return {
    componentName: obj.componentName,
    componentProps: propNames,
  };
}
