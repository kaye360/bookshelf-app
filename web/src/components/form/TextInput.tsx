import { ComponentPropsWithoutRef } from "react"
import { UseFormRegister } from "react-hook-form"


export interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
    label?      : string
    register?   : UseFormRegister<any>
    name        : string
}


export default function TextInput({label, register, name, ...props} : TextInputProps) {

    const Wrapper = label ? 'label' : 'div'

    return (
        <Wrapper className="block">
            { label && (
                <h3 className="font-semibold text-primary-dark mb-1">
                    {label}
                </h3>
            )}


            <input 
                name={ name }
                {...(register &&  register(name) ) }
                {...props}
                className="bg-bg outline outline-1 outline-primary-light w-full sm:min-w-[400px] max-w-xl rounded-md p-4 transition-all" 
            />
        </Wrapper>
    )
}
