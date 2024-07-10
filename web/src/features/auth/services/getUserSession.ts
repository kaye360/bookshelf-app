import { Auth } from "../../../types/types"
import { isJson, isString } from "../../../utils/validation"
import { AuthSchema } from "../validation/authValidation"


export function getUserSessionFromLocalStorage() : Auth {

    const currentSession = validatedSession()

    if( !currentSession || !currentSession.user || !currentSession.token ) {
        return {
            user   : null,
            token  : null,
            error  : 'SESSION',
            isAuth : false
        }
    }

    return  {
        user   : currentSession.user,
        token  : currentSession.token,
        error  : null,
        isAuth : true,
    }
}


function validatedSession() : Pick<Auth, "token" | "user"> | null {
    try {
        const userLocalStorage = localStorage.getItem("auth")
        if( !isString(userLocalStorage || !isJson(userLocalStorage)) ) return null

        const validated = AuthSchema.validateSync( JSON.parse(userLocalStorage as string) )
        return validated

    } catch (e) {
        return null
    }
}