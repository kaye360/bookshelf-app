import { useAuth } from "../features/auth/components/AuthProvider"


interface FetchApiProps {
    url      : string
    method?  : 'GET' | 'POST' | 'PUT' | 'DELETE'
    auth?    : boolean
    payload? : any
}

export default function useFetch() {

    const { token } = useAuth()

    async function fetchApi({ url, method = 'GET', auth = false, payload = null } : FetchApiProps ) {

        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json;charset=UTF-8')
        if (auth) {
            headers.append('Authorization', `Bearer ${token}`)
        }

        const body = payload ? JSON.stringify(payload) : null

        const options = { method, headers, body }

        let data: any
        let error : string | null = null

        try {
            const response = await fetch( url, options)

            if( !response.ok ) {
                throw new Error()
            }

            data = await response.json()

        } catch (e) {
            error = 'Failed to fetch'
        }

        return { data, error }
    }

    return { fetchApi }
}
