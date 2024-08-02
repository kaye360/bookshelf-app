import { Book } from "../../../../types/types"
import BookCover from "../../../../components/common/BookCover"
import UserActions from "../book/UserActions"
import TagList from "./TagList"

export const BookTableComponent = {
    Cell,
    Row
}

function Cell({
    className, 
    children
} : {
    className? : string, 
    children? : any
}) {
    
    return (
        <td className={`p-4 ${className}`}>
            {children}
        </td>
    )
}

function Row({book} : {book : Book}) {

    return (
        <tr className=" even:bg-bg-accent text-sm">
            <Cell>
                <BookCover 
                    size="sm"
                    title={book.title}
                    src={book.imageUrl}
                />
            </Cell>

            <Cell className="font-semibold">
                {book.title}
            </Cell>

            <Cell>
                {book.authors}
            </Cell>

            <Cell>
                <TagList tags={book.tags} />
            </Cell>
            
            <Cell>
                <UserActions book={book} />
            </Cell>
        </tr>
    )
}