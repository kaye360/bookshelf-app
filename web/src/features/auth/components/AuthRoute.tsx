import Error401 from "../../../routes/error/Error401"
import { useAuth } from "./AuthProvider"


export default function AuthRoute({ children } : { children : any}) {

    const { isAuth } = useAuth()
    if( isAuth ) return <>{children}</>
        
    return <Error401 />
}
