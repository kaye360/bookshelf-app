import { array, boolean, number, object, ObjectSchema, string } from "yup"
import { Book } from "../../../types/types"


export const BookSchema : ObjectSchema<Book> = object({
    id            : number().defined().required(),
    key           : string().nullable().notRequired(),
    title         : string().defined(),
    authors       : string().defined(),
    userId        : string().defined(),
    rating        : number().defined(),
    isRead        : boolean().defined(),
    isFavourite   : boolean().defined(),
    created_at    : string().defined(),
    group         : string().oneOf(['wishlist', 'owned']).defined(),
    tags          : array(string().defined()).defined(),
    imageUrl      : string().nullable().defined(),
    pageCount     : number().nullable().defined(),
    publishedDate : string().nullable().defined()
})