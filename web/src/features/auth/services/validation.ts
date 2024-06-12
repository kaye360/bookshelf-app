import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
    
    handle : Yup.string()
                .matches(/^[a-zA-Z0-9_]*$/, {message : 'Invalid characters'})
                .required('This field is required')
                .min(6),
    
    email : Yup.string()
               .email('Must be a valid email address')
               .required('This field is required'),
    
    name : Yup.string()
              .required('This field is required'),
    
    password: Yup.string()
                 .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {message : 'Password must contain at least 1 uppercase letter, lowercase letter, and a number'})
                 .required('This field is required')
                 .min(8),
    
    password_confirmation: Yup.string()
                              .required('This field is required')
                              .oneOf([Yup.ref('password')], 'Password and password confirmation must match' )

    
})


export const loginSchema = Yup.object().shape({

    handle : Yup.string().required(),

    password : Yup.string().required()
})