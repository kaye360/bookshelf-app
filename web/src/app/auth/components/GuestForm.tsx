import { SyntheticEvent } from "react";
import Button from "../../../components/form/Button";
import { LoaderIcon, LoginIcon } from "../../../components/common/Icon";
import { useGuest } from "../api/useGuest";

export default function GuestForm() {

    const guestQuery = useGuest()

    async function handleSubmit(e : SyntheticEvent) {
        e.preventDefault()
        guestQuery.mutate()
    }

    return (
        <div className="px-4">

            <div className="mb-6">
                <h2 className="font-semibold mb-2">
                    Try the app as a guest!
                </h2>
                <p>
                    A random username and password will be created. You may use this account as much as you like until you log out!
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Button 
                    variant="fill"
                    className="w-full"
                    disabled={ guestQuery.isPending === true }
                >
                    { guestQuery.isSuccess || guestQuery.isIdle && (
                        <>
                            Guest Login
                            <LoginIcon />
                        </>
                    )}

                    { guestQuery.isPending && (
                        <>
                            Registering...
                            <LoaderIcon />
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}