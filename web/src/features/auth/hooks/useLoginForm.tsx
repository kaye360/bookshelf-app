import { useForm, SubmitHandler, UseFormHandleSubmit, UseFormRegister, FieldErrors } from "react-hook-form"
import { login } from "../services/actions"
import { AuthError, User } from "../types/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../services/validation"
import { useAuth } from "./useAuth"
import { useAuthDispatch } from "./useAuthDispatch"


interface UseLoginForm { 
    handleSubmit : UseFormHandleSubmit<LoginFormInput, undefined>
    onSubmit     : SubmitHandler<LoginFormInput>
    register     : UseFormRegister<LoginFormInput>
    loading      : boolean
    errorMessage : AuthError
    user         : User | null
    errors       : FieldErrors<LoginFormInput>
}


export interface LoginFormInput {
    handle   : string
    password : string
}


export default function useLoginForm() : UseLoginForm {
    
    const dispatch = useAuthDispatch()
    const { loading, errorMessage, user } = useAuth()
    const { register, handleSubmit, formState : {errors} } = useForm<LoginFormInput>({
        resolver : yupResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<LoginFormInput> = async (formData) => {

        try {
            const payload = {
                handle: formData.handle,
                password : formData.password
            }

            await login(dispatch, payload)
            
        } catch (e) {}
    }

    return { 
        handleSubmit,
        onSubmit,
        register,
        loading,
        errorMessage,
        user,
        errors
    }
}
