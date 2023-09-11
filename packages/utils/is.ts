export function is(val: unknown, type: string) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object');
}

export function isString(val: any): val is Record<any, any> {
    return val !== null && is(val, 'String');
}

export function isFunction(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Function');
}

export function isArray(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Array');
}

export function isBoolean(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Boolean');
}

export function isPromise(val: any): boolean {
    return !!val && is(val.then, 'Function') && is(val.catch, 'Function')
}

export function isEmpty(val: any): boolean {
    let valid = false
    if(val === null) {
        valid = true
    }
    if(val === undefined) {
        valid = true
    }
    if(isNaN(val) && is(val, 'Number')) {
        valid = true
    }
    return valid
}

/**
 * 返回min-max 之间的 n
 * @param {number} n 中间值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number}
 * */
export function clamp(n: number, min: number, max: number){
    return Math.min(max, Math.max(min, n));
}