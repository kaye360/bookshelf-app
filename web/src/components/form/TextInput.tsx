import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions, UseFormRegister } from "react-hook-form"


interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
    label?      : string
    register?   : UseFormRegister<any>
    name        : string
}


export default function TextInput({label, register, name, ...props} : TextInputProps) {

    const Wrapper = label ? 'label' : 'div'

    return (
        <Wrapper className="block">
            { label && (
                <h3 className="font-semibold text-primary-light mb-1">
                    {label}
                </h3>
            )}


            <input 
                {...(register &&  register(name) ) }
                {...props}
                className="bg-bg outline outline-1 outline-primary-light/30 w-full max-w-xl rounded-md p-4 transition-all" 
            />
        </Wrapper>
    )
}
