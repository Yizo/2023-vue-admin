// @ts-ignore
export function deepClone(obj: any) {
    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    } else if (obj && typeof obj === 'object') {
        const cloned = {};
        const keys = Object.keys(obj);
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            // @ts-ignore
            cloned[key] = deepClone(obj[key]);
        }
        return cloned;
    } else {
        return obj;
    }
}