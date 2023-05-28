export function classnames(classesObj) {
  return Object.entries(classesObj).reduce((result, [key, value]) => {
    return value ? `${result} ${key}` : result;
  }, '');
}
