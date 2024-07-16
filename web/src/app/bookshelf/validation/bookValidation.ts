import { array, boolean, number, object, ObjectSchema, string } from "yup"
import { Book } from "../../../types/types"


export const BookSchema : ObjectSchema<Book> = object({
    id          : number().defined(),
    title       : string().defined(),
    authors     : string().defined(),
    userId      : string().defined(),
    rating      : number().defined(),
    isRead      : boolean().defined(),
    isFavourite : boolean().defined(),
    created_at  : string().defined(),
    group       : string().oneOf(['wishlist', 'owned']).defined(),
    tags        : array(string().defined()).defined(),
    imageUrl    : string().defined(),
    isbn10      : string().defined(),
    isbn13      : string().defined()
})