import { object, ObjectSchema, string } from "yup";
import { LoginPayload } from "../../../types/types";


export const loginSchema : ObjectSchema<LoginPayload> = object({
    handle   : string().required(),
    password : string().required()
})