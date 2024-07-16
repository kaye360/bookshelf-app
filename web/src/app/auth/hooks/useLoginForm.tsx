import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLogin } from "../api/useLogin"
import { loginSchema } from "../validation/loginValidation"
import { LoginPayload } from "../../../types/types"


export default function useLoginForm() {
    
    const query = useLogin()

    const { register, handleSubmit, formState : {errors} } = useForm<LoginPayload>({
        resolver : yupResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<LoginPayload> = async (formData) => {
        query.mutate({
            handle: formData.handle,
            password : formData.password
        })
    }

    return { 
        handleSubmit,
        onSubmit,
        register,
        errors,
        query
    }
}
