import { UseAddBook } from "../../routes/add/types"


type ResultsProps = Pick<UseAddBook, 'data'>

export default function Results({data} : ResultsProps) {
    return (
        <div className='grid gap-8 w-full max-w-3xl'>

            { data?.items.map( book => (
                <div className='grid grid-cols-[auto_1fr] gap-3 items-start' key={book.id}>

                    <img src={book.volumeInfo.imageLinks?.thumbnail} />

                    <div className='grid gap-2 justify-start'>
                        <h2 className="font-bold">
                            { book.volumeInfo.title }
                        </h2>
                        <span>
                            { book.volumeInfo.authors?.join(', ') }
                        </span>
                        <span>
                            { book.volumeInfo.pageCount } pages
                        </span>
                        <p>
                            { book.volumeInfo.description?.slice(0,200) }
                            { typeof book.volumeInfo.description === 'string' && 
                            book.volumeInfo.description.length > 200 && 
                                '...'
                            }
                        </p>

                        <button className='flex gap-2 justify-center items-center w-fit min-w-max px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg'>
                            <PlusIcon />
                            Add to my libary
                        </button>

                    </div>
                </div>
            ) )}

        </div>

    )
}


function PlusIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
    )
}