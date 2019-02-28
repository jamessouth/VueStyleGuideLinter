export default function getComponentName(arr) {
  try {
    const name = arr.find(prop => prop.key.name === 'name').value.value;
    return {
      componentName: name,
      componentProps: arr,
    };
  } catch (e) {
    return {
      componentName: '<-    NO NAME FOUND    ->',
      componentProps: arr,
    };
  }
}
