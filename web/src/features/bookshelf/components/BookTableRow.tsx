import UserActions from "./UserActions";
import { HashIcon } from "../../../components/common/Icon";
import { BookTableComponent } from "./BookTableComponents";
import { Book } from "../../../types/types";
import { useBookshelfParams } from "../hooks/useBookShelfParamsContext";

export default function BookTableRow({book} : {book : Book}) {

    const { updateSearchParam } = useBookshelfParams()

    return (
        <tr className=" even:bg-bg-accent text-sm">
            <BookTableComponent.Cell>
                <img src={book.imageUrl} />
            </BookTableComponent.Cell>

            <BookTableComponent.Cell className="font-semibold">
                {book.title}
            </BookTableComponent.Cell>

            <BookTableComponent.Cell>
                {book.authors}
            </BookTableComponent.Cell>

            <BookTableComponent.Cell>
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
            </BookTableComponent.Cell>
            
            <BookTableComponent.Cell>
                <UserActions book={book} />
            </BookTableComponent.Cell>
        </tr>
    )
}


