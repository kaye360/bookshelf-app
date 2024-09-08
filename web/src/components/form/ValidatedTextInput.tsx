import { UseFormRegister, RegisterOptions, FormState } from "react-hook-form";
import { CheckIcon, AlertIcon } from "../common/Icon";
import TextInput from "./TextInput";
import { ComponentPropsWithoutRef, FormEventHandler } from "react";
import { RegisterPayload } from "../../types/types";

interface ValidatedTextInputProps extends ComponentPropsWithoutRef<'input'> {
    label?        : string
    register?     : UseFormRegister<any>
    name          : string
    validation?   : RegisterOptions<any, string> | undefined
    formStateData : [FormState<RegisterPayload>, keyof RegisterPayload]
    onChange?     : FormEventHandler<HTMLInputElement>
}

export default function ValidatedTextInput({ 
    label, 
    register, 
    name, 
    formStateData, 
    onChange, 
    ...props 
} : ValidatedTextInputProps) {

    const [formState, key] = formStateData
    const { errors }       = formState

    const isTouched = Object.hasOwn( formState.dirtyFields, key )
    const hasErrors = Object.hasOwn( errors, key )
     
    return (
        <div 
            className="grid grid-cols-[1fr_30px] items-center gap-2"
            data-testingistouched={isTouched}
            data-testinghaserrors={hasErrors}
        >
            <TextInput 
                label={label}
                name={name}
                register={register}
                onInput={ onChange } // if onChange is used, it conflicts with react-hook-form
                {...props}
            />

            <div className="relative">
                <CheckIcon 
                    className={`
                        text-emerald-400 stroke-2 absolute left-0 top-0s transition-all duration-500
                        ${ isTouched ? 'opacity-1' : 'opacity-0'} 
                        ${ hasErrors ? 'scale-0' : 'scale-1' }
                        `}
                    />
                <AlertIcon className={`
                    text-rose-400 stroke-2 absolute left-0 top-0 transition-all duration-500
                    ${ isTouched ? 'opacity-1' : 'opacity-0'} 
                    ${ hasErrors ? 'scale-1' : 'scale-0' }
                `} />
            </div>

            { hasErrors && (
                <div className="text-rose-400 ">
                    { errors[key]?.message }
                </div>
            )}

        </div>
    )
}
