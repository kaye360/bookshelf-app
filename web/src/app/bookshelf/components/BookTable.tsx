import { BookTableComponent } from "./BookTableComponents"

export default function BookTable({
    children
} : {
    children?:any
}) {

  return (
    <div className="max-w-[100vw] overflow-x-auto">
        <table className="w-full">

            <thead>
                <tr className="font-semibold">
                    <BookTableComponent.Cell>Cover</BookTableComponent.Cell>
                    <BookTableComponent.Cell>Title</BookTableComponent.Cell>
                    <BookTableComponent.Cell>Authors</BookTableComponent.Cell>
                    <BookTableComponent.Cell>Tags</BookTableComponent.Cell>
                    <BookTableComponent.Cell>Actions</BookTableComponent.Cell>
                </tr>
            </thead>

            <tbody>
                {children}
            </tbody>
        
        </table>
    </div>
  )
}
