import { object, ObjectSchema, ref, string } from "yup";

export interface ResetPassword {
    password : string,
    password_confirmation : string
}

export const ResetPasswordSchema : ObjectSchema<ResetPassword> = object({
    
    password: string()
                 .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {message : 'Password must contain at least 1 uppercase letter, lowercase letter, and a number'})
                 .required('This field is required')
                 .min(8),
    
    password_confirmation: string()
                              .required('This field is required')
                              .oneOf([ref('password')], 'Password and password confirmation must match' )
})