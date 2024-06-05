import { UseAddBook } from "../../../routes/add/types"
import { LoaderIcon } from "../../../components/common/Icon"

export default function Status({isFetching, isError, hasNoResults, hasResults, query, data} : UseAddBook['statusProps'] ) {
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
            { hasNoResults && (
                <>
                    No results were found. Please try another search
                </>
            )}
            { hasResults && (
                <>
                    Search results for: <span className='font-bold'>{query}</span> <br />
                    ({data?.totalItems} results)
                </>
            )}
        </div>
    )
}
