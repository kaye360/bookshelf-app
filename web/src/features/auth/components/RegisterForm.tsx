import { SubmitHandler, useForm } from "react-hook-form"
import { register as registerUser } from "../services/actions"
import Button from "../../../components/form/Button"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../services/validation"
import useIsUserHandleAvailable from "../hooks/useIsUserHandleAvailable"
import ValidatedTextInput from "../../../components/form/ValidatedTextInput"
import { CheckIcon, AlertIcon, LoaderIcon } from "../../../components/common/Icon"
import UniqueUsernameStatus from "./UniqueUsernameStatus"
import { useAuthDispatch } from "../hooks/useAuthDispatch"
import { useAuth } from "../hooks/useAuth"


export interface RegisterFormInput {
    handle             : string
    email              : string
    name               : string
    password           : string
    password_confirmation : string
}


export default function RegisterForm() {

    const dispatch = useAuthDispatch()
    const { loading : isLoading, errorMessage: isError, user } = useAuth()

    const { register, handleSubmit, formState } = useForm<RegisterFormInput>({
        resolver : yupResolver(registerSchema),
        mode : 'onTouched'
    })

    const { handleUsernameOnChange, isUserHandleAvailable, hasTouched } = useIsUserHandleAvailable()

    const onSubmit: SubmitHandler<RegisterFormInput> = async (formData) => {

        const payload = {
            handle          : formData.handle,
            email           : formData.email,
            name            : formData.name,
            password        : formData.password,
            password_confirmation : formData.password_confirmation,
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
        
                <ValidatedTextInput 
                    label="Username"
                    name="handle"
                    register={register}
                    onChange={ handleUsernameOnChange }
                    formStateData={ [formState, 'handle'] }
                />     

                { !formState.errors.handle && (
                    <UniqueUsernameStatus 
                        isUserHandleAvailable={isUserHandleAvailable}
                        hasTouched={hasTouched}
                    />
                )}

                <ValidatedTextInput
                    label="Email"
                    name="email"
                    register={register}
                    formStateData={ [formState, 'email' ] }
                />

                <ValidatedTextInput 
                    label="Your Name"
                    name="name"
                    register={register}
                    formStateData={ [formState, 'name' ] }
                />

                <ValidatedTextInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    formStateData={ [formState, 'password' ] }
                />

                <ValidatedTextInput
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    register={register}
                    formStateData={ [formState, 'password_confirmation' ] }
                />
            
                <Button type="submit">
                    Register
                </Button>
        
            </form>

            <div className={`
                flex items-center gap-2 justify-center text-lg font-medium mt-3
                ${isError === 'REGISTER' ? 'text-accent' : ''}
                ${user ? 'text-emerald-400' : ''}
            `}>

                { isLoading && (
                    <>
                        <LoaderIcon />
                        Registering...
                    </>
                )}
                { isError === 'REGISTER' && (
                    <>
                        <AlertIcon />
                        Somthing went wrong, please check all fields.
                    </>
                )}
                { user && (
                    <>
                        <CheckIcon />
                        Success! Redirecting...
                    </>
                )}
            </div>
                
        </div>

    )

}
