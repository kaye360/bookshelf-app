import { UseAddBook } from "../../../routes/add/types";
import Button from "../../../components/form/Button";
import TextInput from "../../../components/form/TextInput";


export default function Form({handleSubmit, onSubmit, register, setQuery} : UseAddBook['formProps']) {
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
