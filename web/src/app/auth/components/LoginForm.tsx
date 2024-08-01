import { AlertIcon, CheckIcon, LoaderIcon, LoginIcon } from "../../../components/common/Icon"
import Button from "../../../components/form/Button"
import TextInput from "../../../components/form/TextInput"
import { useStore } from "../../../store/store"
import useLoginForm from "../hooks/useLoginForm"

export default function LoginForm() {

    const { auth } = useStore()
    const { user } = auth
    const { query, handleSubmit, onSubmit, register, errors } = useLoginForm()

    return (
        <div className="px-4">

            <form 
                onSubmit={handleSubmit( onSubmit ) }
                className="grid gap-6"
            >
        
                <div>
                    <TextInput 
                        label="Username"
                        name="handle"
                        register={register}
                    />

                    { errors.handle?.type === 'required' && (
                        <span className="text-red-400">Username is required.</span>
                    )}
                </div>

                <div>
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        register={register}
                    />

                    { errors.password?.type === 'required' && (
                        <span className="text-red-400">Password is required.</span>
                    )}
                </div>
            
                { !query.isPending && (
                    <Button type="submit">
                        Log In
                        <LoginIcon />
                    </Button>
                )}

                <div className={`
                    flex items-center gap-2 justify-center text-lg font-medium
                    ${query.isError ? 'text-accent' : ''}
                    ${user ? 'text-emerald-500' : ''}
                `}>

                    { query.isPending && (
                        <>
                            <LoaderIcon />
                            Logging in...
                        </>
                    )}
                    { query.isError && (
                        <>
                            <AlertIcon />
                            Incorrect login credentials
                        </>
                    )}
                    { user && (
                        <>
                            <CheckIcon />
                            Success! Redirecting...
                        </>
                    )}
                </div>

                <p>
                    Forgot Password?
                </p>
        
            </form>

        </div>

    )

}