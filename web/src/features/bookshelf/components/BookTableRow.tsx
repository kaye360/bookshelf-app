import UserActions from "./UserActions";
import { HashIcon } from "../../../components/common/Icon";
import { BookTableComponent } from "./BookTableComponents";
import { UserBook } from "../../../types/types";
import { useContext } from "react";
import { BookShelfContext } from "../hooks/useBookShelfContext";

export default function BookTableRow({book} : {book : UserBook}) {

    const { updateSearchParam } = useContext(BookShelfContext)

    return (
        <tr className=" even:bg-bg-accent text-sm">
            <BookTableComponent.Cell>
                <img src={book.image.url} />
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


