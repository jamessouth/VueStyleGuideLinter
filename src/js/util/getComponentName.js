export default function getComponentName(arr) {
  const name = arr.find(prop => prop.key.name === 'name').value.value;
  return {
    componentName: name,
    componentProps: arr,
  };
}
