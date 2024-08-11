
export function isString(data : any) : data is string {
    return typeof data === 'string'
}

export function isNumber(data : any) : data is number {
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

export function isJson(data : string|null) : data is string {

    if( typeof data !== 'string') return false

    try {
        const json = JSON.parse(data)
        if( typeof json === 'object') return true
    }
    catch (e) {}

    return false
}