
export default function BookCardList({
    children
} : {
    children? : any
}) {
    
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-8">
            {children}
        </div>
    )
}
