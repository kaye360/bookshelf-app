import { boolean, number, object, ObjectSchema, string } from "yup"
import { CreateUserModelBook, UserModelBook } from "../../../types/types"


export const CreateUserModelBookSchema : ObjectSchema<CreateUserModelBook> = object({
    title       : string().defined(),
    authors     : string().defined(),
    userId      : string().defined(),
    rating      : number().defined(),
    isRead      : boolean().defined(),
    isFavourite : boolean().defined(),
    group       : string().oneOf(['wishlist', 'owned']).defined(),
    tags        : string().defined(),
    imageUrl    : string().nullable().defined(),
    isbn10      : string().nullable().defined(),
    isbn13      : string().nullable().defined(),
})


export const UserModelBookSchema : ObjectSchema<UserModelBook> = CreateUserModelBookSchema.shape({
    id         : string().required(),
    created_at : string().required(),
})