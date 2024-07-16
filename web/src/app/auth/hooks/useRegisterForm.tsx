import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useStore } from "../../../store/store"
import useRegister from "../api/useRegister"
import { RegisterSchema } from "../validation/registerValidation"
import { RegisterPayload } from "../../../types/types"


export function useRegisterForm() {
    const { auth :  { user } } = useStore()
    const query = useRegister()

    const { register, handleSubmit, formState } = useForm<RegisterPayload>({
        resolver : yupResolver(RegisterSchema),
        mode : 'onTouched'
    })

    return {
        query,
        register,
        handleSubmit,
        formState,
        user
    }
}