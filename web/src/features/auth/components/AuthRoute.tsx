import Error401 from "../../../routes/error/Error401"
import { useStore } from "../../../store/store"


export default function AuthRoute({
    children
} : { 
    children : any
}) {

    const { auth : { isAuth } } = useStore()

    if( isAuth ) {
        return <>{children}</>
    }
        
    return <Error401 />
}
