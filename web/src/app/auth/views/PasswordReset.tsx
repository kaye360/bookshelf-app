import { Link, useParams, useSearchParams } from "react-router-dom";
import H1 from "../../../components/common/H1";
import BaseLayout from "../../../layouts/BaseLayout";
import TextInput from "../../../components/form/TextInput";
import Button from "../../../components/form/Button";
import { useResetPassword } from "../api/useResetPassword";
import { SubmitHandler } from "react-hook-form";
import { usePasswordResetForm } from "../hooks/usePasswordResetForm";
import { ResetPassword } from "../validation/resetPasswordValidation";
import { LoaderIcon, CheckIcon } from "../../../components/common/Icon";

export default function PasswordReset() {

    /**
     * Force this page to log out user if logged in. Use a modal
     */

    const { token }      = useParams()
    const [searchParams] = useSearchParams()
    const email          = searchParams.get('email') || ''

    // const [isSubmit, setIsSubmit] = useState(false)
    const query = useResetPassword()

    const { 
        handleSubmit, 
        register, 
        formState,
    } = usePasswordResetForm()

    const onSubmit : SubmitHandler<ResetPassword> = async () => {
        // setIsSubmit(prev => !prev)
        query.mutate()
    }
    return (
        <BaseLayout>

            <form 
                id="reset-password-form"
                className="grid gap-5 sm:min-w-[400px] max-w-xl mx-auto"
                onSubmit={ handleSubmit( onSubmit )}
            >

                <H1>
                    Reset Password
                </H1>

                <TextInput 
                    label="Email Address"
                    name="email"
                    type="email"   
                    defaultValue={email}
                />

                <TextInput
                    label="Username"
                    name="username"
                />

                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                />
                
                { formState.errors.password && (
                    <span className="text-red-400">
                        {formState.errors.password.message}
                    </span>
                ) }

                <TextInput 
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    register={register}
                />

                { formState.errors.password_confirmation && (
                    <span className="text-red-400">
                        {formState.errors.password_confirmation.message}
                    </span>
                ) }

                <input type="hidden" name="token" defaultValue={token} />

                { query.isError && (
                    <p className="text-red-400">
                        {query.error.message}
                    </p>
                )}

                { !query.isSuccess && (
                    <Button 
                        type="submit"
                        disabled={query.isPending}
                    >
                        { query.isPending && (
                            <>
                                <LoaderIcon />
                                Sending...
                            </>
                        )}
                        { !query.isPending && (
                            <>
                                Update password
                            </>
                        )}
                    </Button>
                )}
                { query.isSuccess && (
                    <div className="flex items-start gap-2">
                        <CheckIcon />
                        <p>
                            <b>Your password has been updated.</b> <br />
                            You may now <Link to="/login">Log in</Link>
                        </p>
                    </div>
                )}

            </form>
        </BaseLayout>
    )
}
