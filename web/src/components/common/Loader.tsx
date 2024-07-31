import { LoaderIcon } from "./Icon";

export default function Loader({
    message = 'Loading...'
} : {
    message? : string
}) {
    return (
        <div className="flex items-center gap-3 w-full bg-primary-light/25 px-6 py-12 text-2xl rounded-lg ">
            <LoaderIcon size={32} />
            {message}
        </div>
    )
}
