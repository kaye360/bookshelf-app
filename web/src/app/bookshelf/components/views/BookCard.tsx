import { Book } from "../../../../types/types";
import BookCover from "../../../../components/common/BookCover";
import UserActions from "../book/UserActions";
import { useBookshelfContext } from "../../hooks/useBookShelfContext";
import TagButton from "./TagButton";
import TagList from "./TagList";

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

                <TagList tags={book.tags } />

                <UserActions book={book} />
            </div>
        </div>
    )
}
