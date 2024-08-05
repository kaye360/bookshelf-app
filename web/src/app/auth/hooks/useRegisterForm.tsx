import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { RegisterSchema } from "../validation/registerValidation"
import { RegisterPayload } from "../../../types/types"

export function useRegisterForm() {

    const { register, handleSubmit, formState } = useForm<RegisterPayload>({
        resolver : yupResolver(RegisterSchema),
        mode : 'onTouched'
    })

    return {
        register,
        handleSubmit,
        formState,
    }
}