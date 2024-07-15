
export default function Heading({
    children
} : {
    children : any
}) {
    return (
        <h2 className="font-semibold text-lg mb-5 border-b border-primary-light">
            {children}
        </h2>
    )
}
