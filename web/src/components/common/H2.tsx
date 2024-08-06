
export default function H2({
    className = '',
    children
} : {
    className? : string
    children : any
}) {
    return (
        <h2 className={`font-bold text-xl mb-4 ${className}`}>
            {children}
        </h2>
    )
}
