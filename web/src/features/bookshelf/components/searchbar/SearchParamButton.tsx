

export default function SearchParamButton({
    hasSearchQuery = false, 
    children
} : {
    hasSearchQuery? : boolean,
    children : any
}) {
    return (
        <span className={`
            block px-3 md:px-4 py-1 text-sm border border-primary-light rounded-lg bg-primary-light/10 min-w-max
            ${ hasSearchQuery ? 'opacity-30' : ''}
        `}>
            {children}
        </span>
    )
}