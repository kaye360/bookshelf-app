import BaseLayout from "../../layouts/BaseLayout"

export default function Error404() {

    return (
        <BaseLayout>
            <div className="grid gap-4">

                <div className=" max-w-xl mx-auto p-4">

                    <h1 className="flex items-center gap-2 text-2xl font-semibold mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        Not Found
                    </h1>

                    <p>
                        The page you are looking for could not be found.
                    </p>

                </div>

            </div>
        </BaseLayout>
    )
}