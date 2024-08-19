
export function isString(
    data : any,
    options : { includeEmpty?: boolean } = { includeEmpty : true }
) : data is string {
    return  options.includeEmpty
        ? typeof data === 'string'
        : typeof data === 'string' && data !== ''
}

export function isNumber(data : any) : data is number {
    if( 
        ( !data && data !== 0) ||
        data === '' || 
        Array.isArray(data)
    ) return false
    return !isNaN(data)
}

export function isArray(data: any) : data is Array<any> {
    return Array.isArray(data)
}

export function isArrayOfStrings(data : any) : data is string[] {
    if( !Array.isArray(data) ) {
        return false
    }
    if( !data.every(item => typeof item === 'string') ) {
        return false
    }
    return true
}

export function isObject(data: any) : data is object {
    return typeof data === 'object' &&  data !== null && !Array.isArray(data)
}

export function objectLength(data: object) : number {
    if( !isObject(data) ) throw new Error('Invalid objectLength prop')
    return Object.keys(data).length
}

export function isJson(data : any) : data is string {

    if( typeof data !== 'string') return false

    try {
        JSON.parse(data)
        return true
    }
    catch (e) {}

    return false
}