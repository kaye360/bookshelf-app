import { useForm, SubmitHandler } from "react-hook-form"
import { login } from "../services/actions"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../services/validation"
import { useAuthDispatch } from "./useAuthDispatch"
import { useAuth } from "./useAuth"


export interface LoginFormInput {
    handle   : string
    password : string
}


export default function useLoginForm() {
    
    const dispatch = useAuthDispatch()
    const { updateUser } = useAuth()

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

            updateUser()
            
        } catch (e) {}
    }

    return { 
        handleSubmit,
        onSubmit,
        register,
        errors
    }
}
