import { isString } from "../../utils/validation"
import { ReqProps, ReqResponse } from "./Req.type"

/**
 * 
 * Base Request Class
 * 
 * Exposes methods for GET PUT DELETE and POST requests
 * 
 * @method get 
 * @method post
 * @method put
 * @method delete 
 * 
 */
export class Req {

    static async get(props : string | Omit<ReqProps, 'payload'>) {

        let response : ReqResponse

        if( isString(props) ) {
            response = await this.send({ method : 'GET', url : props})

        } else {
            response = await this.send({
                method  : 'GET',
                url     : props.url,
                token   : props.token
            })
        }

        return response
    }



    static async post({ url, token, payload } : ReqProps) {
        const response = await this.send({ url, token, payload, method : 'POST' })
        return response
    }



    static async put({ url, token, payload } : ReqProps) {
        const response = await this.send({ url, token, payload, method : 'PUT' })
        return response
    }



    static async delete({ url, token, payload } : ReqProps) {
        const response = await this.send({ url, token, payload, method : 'DELETE' })
        return response
    }



    private static async send({ 
        url,
        method,
        token = undefined,
        payload = undefined
    } : {
        url      : string
        method   : 'GET' | 'POST' | 'PUT' | 'DELETE',
        token?   : string
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



    private static headers({
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



    private static returnProps() : {
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
