

export default function SearchParamButton({
    disabled = false, 
    children
} : {
    disabled? : boolean,
    children : any
}) {
    return (
        <span className={`
            flex items-center gap-1 px-3 md:px-4 py-1 text-sm border border-primary-light rounded-lg bg-primary-light/10 min-w-max
            ${ disabled ? 'opacity-30' : ''}
        `}>
            {children}
        </span>
    )
}