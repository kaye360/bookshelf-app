import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { ResetPassword, ResetPasswordSchema } from "../validation/resetPasswordValidation"

export function usePasswordResetForm() {

    const { register, handleSubmit, formState } = useForm<ResetPassword>({
        resolver : yupResolver(ResetPasswordSchema),
        mode : 'onTouched'
    })

    return {
        register,
        handleSubmit,
        formState,
    }
}