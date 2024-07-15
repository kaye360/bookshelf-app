
export default function Section({
    className = '',
    children
} : {
    className? : string
    children : any
}) {
    return (
        <div className={`my-12 ${className}`}>
            {children}
        </div>
    )
}
