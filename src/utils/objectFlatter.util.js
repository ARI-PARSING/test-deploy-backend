export const flattenObject = (obj, parentKey = '', result = {}) => {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value.toString ? value.toString() : value;
        }
    }
    return result;
};