import { useAuth } from "../features/auth/hooks/useAuth"


interface FetchApiProps {
    url      : string
    method?  : 'GET' | 'POST' | 'PUT' | 'DELETE'
    auth?    : boolean
    payload? : any
}


export default function useFetch() {

    const { token } = useAuth()

    async function fetchApi({ url, method = 'GET', auth = false, payload = null } : FetchApiProps ) {

        const headers = getHeaders(auth, token)
        const body    = payload ? JSON.stringify(payload) : null
        const options = { method, headers, body }

        let data: any = ''
        let error : string | null = null
        let code : number | null = null

        try {
            const response = await fetch( url, options)
            code = response.status

            if( !response.ok ) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            data = await response.json()

        } catch (e : any) {
            error = e instanceof Error ? e.message : 'Something went wrong. Please try again.'
        }

        return { data, error, code }
    }

    return { fetchApi }
}



function getHeaders(auth : boolean = false, token? : string | null) {

    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json;charset=UTF-8')

    if (auth && token) {
        headers.append('Authorization', `Bearer ${token}`)
    }

    return headers
}