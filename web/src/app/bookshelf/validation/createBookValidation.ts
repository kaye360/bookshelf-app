import { ObjectSchema, string } from "yup"
import { CreateBook } from "../../../types/types"
import { BookSchema } from "./bookValidation"


export const CreateBookSchema : ObjectSchema<CreateBook> = BookSchema.omit(['id', 'created_at']).shape({
    tags : string().required()
})