import { SubmitHandler } from "react-hook-form"
import Button from "../../../components/form/Button"
import useIsUserHandleAvailable from "../hooks/useIsUserHandleAvailable"
import ValidatedTextInput from "../../../components/form/ValidatedTextInput"
import { CheckIcon, AlertIcon, LoaderIcon, LoginIcon } from "../../../components/common/Icon"
import UniqueUsernameStatus from "./UniqueUsernameStatus"
import { useRegisterForm } from "../hooks/useRegisterForm"
import { RegisterPayload } from "../../../types/types"
import useRegister from "../api/useRegister"

export default function RegisterForm() {

    const query = useRegister()
    
    const { 
        handleSubmit, 
        register, 
        formState,
    } = useRegisterForm()

    const { 
        handleUsernameOnChange, 
        isTouched,
        status
    } = useIsUserHandleAvailable()

    const onSubmit: SubmitHandler<RegisterPayload> = async (formData) => {
        query.mutate({
            handle   : formData.handle,
            email    : formData.email,
            name     : formData.name,
            password : formData.password,
            password_confirmation : formData.password_confirmation,
        })
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

                { status !== 'initial' && (
                    <UniqueUsernameStatus 
                        status={status}
                        isTouched={isTouched}
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
                    <LoginIcon />
                </Button>
        
            </form>

            <div className={`
                flex items-center gap-2 justify-center text-lg font-medium mt-3
                ${query.isError ? 'text-accent' : ''}
                ${query.isSuccess ? 'text-emerald-400' : ''}
            `}>

                { query.isPending && (
                    <>
                        <LoaderIcon />
                        Registering...
                    </>
                )}
                { query.isError && (
                    <>
                        <AlertIcon />
                        Somthing went wrong, please check all fields.
                    </>
                )}
                { query.isSuccess && (
                    <>
                        <CheckIcon />
                        Success! Redirecting...
                    </>
                )}
            </div>
                
        </div>

    )

}
