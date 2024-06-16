import Button from "../../../components/form/Button";
import TextInput from "../../../components/form/TextInput";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";


export interface SearchInput {
    query : string
}


interface FormProps {
    handleSubmit   : UseFormHandleSubmit<SearchInput, undefined>,
    onSubmit       : SubmitHandler<SearchInput>,
    register       : UseFormRegister<SearchInput>,
    setSearchQuery : Dispatch<SetStateAction<string | null>>
}


export default function Form( {handleSubmit, onSubmit, register, setSearchQuery} : FormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextInput
                label='Find your books'
                name="query"
                type='search'
                register={register}
                placeholder='Enter an author, book title, category, or isbn'
                autoComplete="off"
            />

            <div className='flex items-center gap-4 mt-4'>

                <Button>
                    Search
                </Button>
                
                <Button 
                    variant='ghost'
                    type='reset'
                    onClick={ () => setSearchQuery(null) }
                >
                    Reset
                </Button>

            </div>

        </form>
    )
}
