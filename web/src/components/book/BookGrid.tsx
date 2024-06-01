
export default function BookGrid({children} : {children : any}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
            {children}
        </div>
    )
}
