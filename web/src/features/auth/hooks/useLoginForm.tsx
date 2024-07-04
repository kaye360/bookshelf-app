import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../services/validation"
import { useLogin } from "../api/useLogin"


export interface LoginFormInput {
    handle   : string
    password : string
}


export default function useLoginForm() {
    
    const login = useLogin()

    const { register, handleSubmit, formState : {errors} } = useForm<LoginFormInput>({
        resolver : yupResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<LoginFormInput> = async (formData) => {
        await login({
            handle: formData.handle,
            password : formData.password
        })
    }

    return { 
        handleSubmit,
        onSubmit,
        register,
        errors
    }
}
