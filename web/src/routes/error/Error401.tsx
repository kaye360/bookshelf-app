import LoginOrRegisterForm from "../../features/auth/components/LoginOrRegisterForm";
import BaseLayout from "../../layouts/BaseLayout";

export default function Error401() {
    return (
        <BaseLayout>
            <div className="grid gap-4">

                <div className=" max-w-xl mx-auto p-4">

                    <h1 className="flex items-center gap-2 text-2xl font-semibold mb-3">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Access Denied
                    </h1>

                    <p>
                        You must be logged in to view this page. To view this content, please use the form to log in or sign up.
                    </p>

                </div>

                <LoginOrRegisterForm />

            </div>
        </BaseLayout>
    )
}
