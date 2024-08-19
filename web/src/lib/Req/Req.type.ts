

export interface ReqResponse {
    data? : any, 
    error : string|null, 
    code  : number|null
}

export interface ReqProps {
    url      : string
    token?   : string
    payload? : any
}