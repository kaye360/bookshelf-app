
export default function Paragraph({
    children
} : {
    children : any
}) {
    return (
        <p className=" text-base leading-7 max-w-[60ch]">
            {children}
        </p>
    )
}
