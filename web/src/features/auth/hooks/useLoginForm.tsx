import { useForm, SubmitHandler, UseFormHandleSubmit, UseFormRegister, FieldErrors } from "react-hook-form"
import { useAuthDispatch, useAuth } from "../components/AuthProvider"
import { login } from "../services/actions"
import { User } from "../types/types"

interface UseLoginForm { 
    handleSubmit : UseFormHandleSubmit<LoginFormInput, undefined>
    onSubmit     : SubmitHandler<LoginFormInput>
    register     : UseFormRegister<LoginFormInput>
    loading      : boolean
    errorMessage : string | null
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
    const { register, handleSubmit, formState : {errors} } = useForm<LoginFormInput>()

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
