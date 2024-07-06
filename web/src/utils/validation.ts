

export function isString(data : any) : data is string {
    return typeof data === 'string'
}


export function isNumber(data : any) : data is number {
    return !isNaN(data)
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