
export default function BookGrid({
    children
} : {
    children : any
}) {
    
    return (
        <div className="grid grid-cols-[repeat(auto-fill,175px)] gap-x-5 gap-y-8">
            {children}
        </div>
    )
}
