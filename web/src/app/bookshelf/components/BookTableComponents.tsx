import { HashIcon } from "../../../components/common/Icon"
import { Book } from "../../../types/types"
import UserActions from "./UserActions"
import { useBookshelfParams } from "../hooks/useBookShelfParamsContext"
import BookCover from "../../../components/common/BookCover"


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

    const { updateSearchParam } = useBookshelfParams()

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
                <div className="flex items-center gap-x-2 flex-wrap">
                    {book.tags.map( tag => (
                        <button 
                            key={tag}
                            onClick={ () => updateSearchParam('filterBy', tag) }
                            className="flex items-center"
                        >
                            <HashIcon size={18} />
                            {tag}
                        </button>
                    ))}
                </div>
            </Cell>
            
            <Cell>
                <UserActions book={book} />
            </Cell>
        </tr>
    )
}

