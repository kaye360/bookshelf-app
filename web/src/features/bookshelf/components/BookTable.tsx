import BookTableCell from "./BookTableCell";

export default function BookTable({children} : {children?:any}) {
  return (
    <div className="max-w-[100vw] overflow-x-auto">
        <table className="w-full">

            <thead>
                <tr className="font-semibold">
                    <BookTableCell>Cover</BookTableCell>
                    <BookTableCell>Title</BookTableCell>
                    <BookTableCell>Authors</BookTableCell>
                    <BookTableCell>Tags</BookTableCell>
                    <BookTableCell>Actions</BookTableCell>
                </tr>
            </thead>

            <tbody>
                {children}
            </tbody>
        
        </table>
    </div>
  )
}
