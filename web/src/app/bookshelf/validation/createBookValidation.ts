import { mixed, ObjectSchema, string } from "yup"
import { CreateBook } from "../../../types/types"
import { BookSchema } from "./bookValidation"


export const CreateBookSchema : ObjectSchema<CreateBook> = BookSchema.shape({
    id         : mixed().notRequired(),
    created_at : mixed().notRequired(),
    isbn10     : string().nullable().defined(),
    isbn13     : string().nullable().defined(),
    tags       : string().required(),
    imageUrl   : string().nullable().defined()
})