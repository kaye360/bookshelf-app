
export default function Slider({
    children
}: {
    children: any
}) {
    return (
        <div className="flex gap-5 py-2 overflow-x-scroll">
            {children}
        </div>
    )
}
