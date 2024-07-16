
export default function Slider({
    children
}: {
    children: any
}) {
    return (
        <div className="flex gap-5 [&>div]:min-w-[150px] overflow-x-scroll">
            {children}
        </div>
    )
}
