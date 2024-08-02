import { useStore } from "../../../store/store"

export default function AuthRoute({
    children
} : { 
    children : any
}) {

    const { auth : { isAuth } } = useStore()

    if( !isAuth ) {
        throw new Response("Unauthorized", { status : 401 })
    }
    
    return <>{children}</>
}
