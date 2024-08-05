import { SyntheticEvent } from "react";
import H1 from "../../../components/common/H1";
import Button from "../../../components/form/Button";
import TextInput from "../../../components/form/TextInput";
import BaseLayout from "../../../layouts/BaseLayout";
import { useResetPasswordRequest } from "../api/useResetPasswordRequest";
import { CheckIcon, LoaderIcon } from "../../../components/common/Icon";

export default function PasswordResetRequest() {

    const query = useResetPasswordRequest()

    async function handlePasswordResetRequest(e: SyntheticEvent) {
        e.preventDefault()
        query.mutate()
    }

    return (
        <BaseLayout>

            <form
                onSubmit={handlePasswordResetRequest}
                id="reset-password-request-form"
                className="grid gap-5 sm:min-w-[400px] max-w-xl mx-auto"
            >
                <H1>
                    Password Reset Request
                </H1>

                <p
                    className="bg-primary-light/30 p-4 rounded-lg text-sm "
                >
                    To reset your password, please enter your username below. A reset link will be emailed to the email address associated with that account
                </p>

                <TextInput 
                    label="Username"
                    name="username"
                />

                { query.isError && (
                    <p className="text-red-500">
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
                                Send reset link
                            </>
                        )}
                    </Button>
                )}
                { query.isSuccess && (
                    <div className="flex items-start gap-2">
                        <CheckIcon />
                        <p>
                            <b>Email sent!</b> <br />
                            Please check your inbox for further instructions
                        </p>
                    </div>
                )}

            </form>
        </BaseLayout>
    )
}
