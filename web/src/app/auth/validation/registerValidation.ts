import { object, ObjectSchema, ref, string } from "yup";
import { RegisterPayload } from "../../../types/types";


export const RegisterSchema : ObjectSchema<RegisterPayload> = object({
    
    handle : string()
                .matches(/^[a-zA-Z0-9_]*$/, {message : 'Invalid characters'})
                .required('This field is required')
                .min(6),
    
    email : string()
               .email('Must be a valid email address')
               .required('This field is required'),
    
    name : string()
              .required('This field is required'),
    
    password: string()
                 .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {message : 'Password must contain at least 1 uppercase letter, lowercase letter, and a number'})
                 .required('This field is required')
                 .min(8),
    
    password_confirmation: string()
                              .required('This field is required')
                              .oneOf([ref('password')], 'Password and password confirmation must match' )
})