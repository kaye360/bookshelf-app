import { UseAddBook } from "../../routes/add/types";
import Button from "../form/Button";
import TextInput from "../form/TextInput";

type FormProps = Pick<UseAddBook, 'handleSubmit' | 'onSubmit' | 'register' | 'setQuery'>

export default function Form({handleSubmit, onSubmit, register, setQuery} : FormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextInput
                label='Find your books'
                name="query"
                type='search'
                register={register}
                placeholder='Enter an author, book title, category, or isbn'
            />

            <div className='flex items-center gap-4'>

                <Button>
                    Search
                </Button>
                
                <Button 
                    variant='ghost'
                    type='reset'
                    onClick={ () => setQuery(null) }
                >
                    Reset
                </Button>

            </div>

        </form>
    )
}
