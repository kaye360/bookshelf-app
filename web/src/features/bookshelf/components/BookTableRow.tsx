import { UserBook } from "../../book/types/types";
import BookTableCell from "./BookTableCell";
import UserActions from "./UserActions";
import { HashIcon } from "../../../components/common/Icon";
import useSearchBarParams from "../../searchbar/hooks/useSearchBarParams";

export default function BookTableRow({book} : {book : UserBook}) {

    const { updateSearchParam } = useSearchBarParams()

    return (
        <tr className=" even:bg-bg-accent text-sm">
            <BookTableCell>
                <img src={book.image.url} />
            </BookTableCell>

            <BookTableCell className="font-semibold">
                {book.title}
            </BookTableCell>

            <BookTableCell>
                {book.authors}
            </BookTableCell>

            <BookTableCell>
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
            </BookTableCell>
            
            <BookTableCell>
                <UserActions book={book} />
            </BookTableCell>
        </tr>
    )
}


