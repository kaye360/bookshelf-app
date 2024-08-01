import { ComponentPropsWithoutRef } from "react";
import { Book } from "../../../../types/types";
import BookCover from "../../../../components/common/BookCover";
import UserActions from "../book/UserActions";
import { useBookshelfContext } from "../../hooks/useBookShelfContext";

interface BookGridItemProps extends ComponentPropsWithoutRef<'div'> {
    book : Book
    hideUserActions? : boolean
}

export default function BookGridItem({
    book, 
    hideUserActions = false
} : BookGridItemProps ) {

    const { updateSearchParam } = useBookshelfContext()

    return (
        <div className={`flex flex-col gap-2 text-primary-dark`}>

            <BookCover 
                size="lg" 
                title={book.title} 
                src={book.imageUrl}
            />

            { !hideUserActions && 
                <div className="flex flex-wrap items-center gap-x-2 text-xs overflow-hidden">
                    {book.tags.map( (tag, i) => (
                        <button 
                            key={i}
                            onClick={ () => updateSearchParam('filterBy', tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            }

            { !hideUserActions && <UserActions book={book} /> }

        </div>
    )
}

