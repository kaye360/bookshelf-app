import { array, boolean, number, object, ObjectSchema, string } from "yup"
import { UserBook } from "../../../types/types"


export const UserBookSchema : ObjectSchema<UserBook> = object({
    id          : number().defined(),
    title       : string().defined(),
    authors     : string().defined(),
    userId      : string().defined(),
    rating      : number().defined(),
    created_at  : string().defined(),
    isRead      : boolean().defined(),
    isFavourite : boolean().defined(),
    group       : string().oneOf(['wishlist', 'owned']).defined(),
    tags        : array(string().defined()).defined(),
    image       : object({
        url : string().defined()
    }).defined(),
    isbn        : object({
        isbn10 : string().defined(),
        isbn13 : string().defined()
    }).defined(),
})