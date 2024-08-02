import { ComponentPropsWithoutRef } from "react";
import { Book } from "../../../../types/types";
import BookCover from "../../../../components/common/BookCover";
import UserActions from "../book/UserActions";
import TagList from "./TagList";

interface BookGridItemProps extends ComponentPropsWithoutRef<'div'> {
    book : Book
    hideUserActions? : boolean
}

export default function BookGridItem({
    book, 
    hideUserActions = false
} : BookGridItemProps ) {

    return (
        <div className={`flex flex-col gap-2 text-primary-dark`}>

            <BookCover 
                size="lg" 
                title={book.title} 
                src={book.imageUrl}
            />

            { !hideUserActions && <TagList tags={book.tags} /> }

            { !hideUserActions && <UserActions book={book} /> }

        </div>
    )
}

