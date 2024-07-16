import { object, ObjectSchema, string } from "yup"
import { AuthSuccess } from "../../../types/types"
import { UserSchema } from "./userValidation"


export const AuthSchema : ObjectSchema<Pick<AuthSuccess, 'token' | 'user'>> = object({
    user   : UserSchema,
    token  : string().defined(),
})