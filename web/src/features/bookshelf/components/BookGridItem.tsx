import UserActions from "./UserActions";
import { ComponentPropsWithoutRef } from "react";
import { UserBook } from "../../../types/types";
import { useBookshelfParams } from "../hooks/useBookShelfParamsContext";


interface BookGridItemProps extends ComponentPropsWithoutRef<'div'> {
    book : UserBook
    hideUserActions? : boolean
}


export default function BookGridItem({
    book, 
    hideUserActions = false
} : BookGridItemProps ) {

    const hasImage = book.image.url.includes('google')
    const { updateSearchParam } = useBookshelfParams()

    return (
        <div className={` grid gap-1 text-primary-dark animate-scale-in ori `}>

            { hasImage ? (
                <img 
                    src={book.image.url} 
                    className="w-full aspect-[2/3] object-cover rounded-md"
                />
            ) : (
                <div className="bg-primary-light text-primary-dark/80 rounded min-h-64 p-4">
                    {book.title}
                </div>
            )}

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

