
export function mockResponse({
    data,
    status = 200,
    ok = true
} : {
    data    : object, 
    status? : number, 
    ok?     : boolean
}
) {
    return { 
        json: () => new Promise((resolve) => resolve(data)),
        status,
        ok,
        statusText : 'MockError'
    }
}