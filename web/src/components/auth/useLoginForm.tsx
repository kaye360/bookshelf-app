import { useForm, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { useAuthDispatch, useAuth } from "../../lib/auth/AuthProvider"
import { login } from "../../lib/auth/actions"
import { User } from "../../lib/auth/types"

interface UseLoginForm { 
    handleSubmit : UseFormHandleSubmit<LoginFormInput, undefined>
    onSubmit     : SubmitHandler<LoginFormInput>
    register     : UseFormRegister<LoginFormInput>
    loading      : boolean
    errorMessage : string | null
    user         : User | null
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

        const payload = {
            handle: formData.handle,
            password : formData.password
        }

        try {
            await login(dispatch, payload)
        } catch (e) {}
    }

    return { 
        handleSubmit,
        onSubmit,
        register,
        loading,
        errorMessage,
        user
    }
}
