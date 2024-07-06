

export interface ReqResponse {
    data? : any, 
    error : string|null, 
    code : number|null
}


export class Req {

    static async send({ 
        url,
        method = 'GET',
        token = undefined,
        payload = undefined
    } : {
        url : string
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
        token? : string
        payload? : any
    }) : Promise<ReqResponse> {
    
        let { data, error, code } = this.returnProps()

        const options = { 
            method, 
            headers : this.headers({token}), 
            body    : payload ? JSON.stringify(payload) : null
        }
    
        try {
            const response = await fetch( url, options )
            code = response.status
    
            if( !response.ok ) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
    
            data = await response.json()
    
        } catch (e : any) {
            error = e instanceof Error ? e.message : 'Something went wrong. Please try again'
        }

        return { data, error, code }
    }


    static headers({
        token = undefined
    } : {
        token? : string
    }) {

        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json;charset=UTF-8')
    
        if (token) {
            headers.append('Authorization', `Bearer ${token}`)
        }
    
        return headers
    }


    static returnProps() : {
        data  : any 
        error : string | null 
        code  : number | null 
    } {
        let data  = undefined
        let error = null
        let code  = null
        
        return { data, error, code}
    }
}
