import { SubmitHandler, useForm } from "react-hook-form"
import TextInput from "../form/TextInput"
import { useAuthDispatch, useAuth } from "../../lib/auth/AuthProvider"
import { register as registerUser } from "../../lib/auth/actions"
import Button from "../form/Button"

interface RegisterFormInput {
    handle          : string
    email           : string
    name            : string
    password        : string
    confirmPassword : string
}


export default function RegisterForm() {

    const dispatch = useAuthDispatch()
    const { loading, errorMessage, user } = useAuth()
    const { register, handleSubmit, formState : {errors} } = useForm<RegisterFormInput>()


    const onSubmit: SubmitHandler<RegisterFormInput> = async (formData) => {

        const payload = {
            handle          : formData.handle,
            email           : formData.email,
            name            : formData.name,
            password        : formData.password,
            confirmPassword : formData.confirmPassword,
        }

        try {
            await registerUser(dispatch, payload)
        } catch (e) {}
    }

    return (
        <div className="px-4">

            <form 
                onSubmit={handleSubmit( onSubmit ) }
                className="grid gap-4"
            >
        
                <TextInput 
                    label="Username"
                    name="handle"
                    register={register}
                />

                <TextInput 
                    label="Email"
                    name="email"
                    register={register}
                />

                <TextInput 
                    label="Your Name"
                    name="name"
                    register={register}
                />

                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                />

                <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    register={register}
                />
            
                <Button type="submit">
                    Register
                </Button>
        
            </form>

            {
                user && <p className=" text-emerald-400">Success! Redirecting...</p>
            }

            {
                loading && <p>Loading...</p>
            }
        
            {
                errorMessage  && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
            )}
        
        </div>

    )

}