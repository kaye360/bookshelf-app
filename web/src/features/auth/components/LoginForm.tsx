import { AlertIcon, CheckIcon, LoaderIcon } from "../../../components/common/Icon"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
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