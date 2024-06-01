
export default function BookGrid({children} : {children : any}) {
    return (
        <div className="flex flex-wrap justify-between gap-3">
            {children}
        </div>
    )
}
