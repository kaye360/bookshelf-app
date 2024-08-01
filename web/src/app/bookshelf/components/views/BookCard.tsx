import { Book } from "../../../../types/types";
import BookCover from "../../../../components/common/BookCover";
import UserActions from "../book/UserActions";
import { useBookshelfContext } from "../../hooks/useBookShelfContext";

export default function BookCard({
    book
} : {
    book: Book
}) {

    const { updateSearchParam } = useBookshelfContext()

    return (
        <div className="grid grid-cols-[auto_1fr] gap-3 text-sm">
            
            <BookCover
                size="md"
                title={book.title}
                src={book.imageUrl}
            />

            <div className="flex flex-col gap-1">
                <span className="font-semibold">
                    {book.title}
s               </span>

                <div>
                    {book.authors}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    {book.tags.map( tag => (
                        <button
                            key={tag}
                            onClick={ () => updateSearchParam('filterBy', tag) }
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                <UserActions book={book} />
            </div>
        </div>
    )
}
