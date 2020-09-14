export function deepClone(element) {
    if (!(typeof element === 'object')) return element;
    if (element === null) return null;
    return element instanceof Array
        ? element.map(item => deepClone(item))
        : Object.entries(element)
            .reduce((pre, [key, val]) => ({ ...pre, [key]: deepClone(val) }), {});
}