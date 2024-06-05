import Button from "../../../components/form/Button"
import TextInput from "../../../components/form/TextInput"
import useLoginForm from "../hooks/useLoginForm"

export default function LoginForm() {

    const {  handleSubmit, onSubmit, register, loading, errorMessage, user } = useLoginForm()

    return (
        <div className="px-4">

            <form 
                onSubmit={handleSubmit( onSubmit ) }
                className="grid gap-6"
            >
        
                <TextInput 
                    label="Username"
                    name="handle"
                    register={register}
                />

                <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    register={register}
                />
            

                <Button type="submit">
                    Log In
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </Button>

                <p>
                    Forgot Password?
                </p>
        
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