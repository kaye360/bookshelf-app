import { ObjectSchema, object, number, string } from "yup";
import { User } from "../../../types/types";


export const UserSchema : ObjectSchema<User> = object({
    id     : number().defined(),
    handle : string().defined(),
    email  : string().defined(),
})
