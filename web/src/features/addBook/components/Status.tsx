import { LoaderIcon } from "../../../components/common/Icon"
import { GoogleBookResponse } from "../../book/types/types"


interface StatusProps {
    isFetching  : boolean
    isError     : boolean
    hasResults  : boolean
    searchQuery : string | null
    data        : GoogleBookResponse | null
}


export default function Status( {isFetching, isError, hasResults, searchQuery, data} : StatusProps ) {

    return (
        <div className='text-xl my-6'>
            { isFetching && (
                <div className='flex items-center gap-2'>
                    <LoaderIcon />
                    Searching
                </div>
            )}
            { isError && (
                <>
                    Something went wrong, please try again.
                </>
            )}
            { !hasResults || !searchQuery && (
                <>
                    No results were found. Please try another search
                </>
            )}
            { hasResults && (
                <>
                    Search results for: <span className='font-bold'>{searchQuery}</span> <br />
                    ({data?.totalItems} results)
                </>
            )}
        </div>
    )
}
