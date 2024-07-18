
export default function Avatar({
    handle
} : {
    handle : string
}) {

    const avatarLetter = handle.charAt(0).toLocaleUpperCase()

    return (
        <span className="block relative w-9 h-9 rounded-full bg-primary-dark/50 text-white text-xl mr-1 font-medium pointer-events-none select-none">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {avatarLetter}
            </span>
        </span>
    )
}
