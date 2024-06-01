
export default function BookCardList({children} : {children? : any}) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {children}
        </div>
    )
}
