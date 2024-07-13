import { CloseIcon } from "../../../../components/common/Icon"
import { UserSettings } from "../../../../types/types"
import { useBookshelfParams } from "../../hooks/useBookShelfParamsContext"
import FilterButton from "./FilterButton"
import SearchParamButton from "./SearchParamButton"

export default function CurrentSearchParamBar({
    setShowFilters
} : {
    setShowFilters : React.Dispatch<React.SetStateAction<boolean>>
}) {

    const {searchParams, updateSearchParam} = useBookshelfParams()

    const hasSearchQuery: boolean = searchParams.get('searchQuery') !== ''

    const filterIsTag = !['all', 'read', 'unread', 'favourites', 'owned', 'wishlist'].includes(searchParams.get('filterBy'))

    const viewAsParam : string = searchParams.get('viewAs') as string
    const viewAs = viewAsParam.slice(0,1).toUpperCase() + viewAsParam.slice(1)

    const sortBy = searchParams.get('sortBy') as UserSettings['sort']

    const filterByParam : string = searchParams.get('filterBy') as string
    const filterBy = filterIsTag 
        ? filterByParam
        : filterByParam.slice(0,1).toUpperCase() + filterByParam.slice(1)

    const sortTitles : { [key in UserSettings['sort']] : string } = {
        title   : 'Title A-Z',
        authors : 'Authors A-Z',
        newest  : 'Newest First',
        oldest  : 'Oldest First'
    }
    
    return (
        <div className="flex items-stretch gap-2 flex-wrap mt-1">

            <FilterButton setShowFilters={setShowFilters} />

            <SearchParamButton>
                View: { viewAs }
            </SearchParamButton>

            <SearchParamButton>
                Sort: {sortTitles[sortBy]} <br />
            </SearchParamButton>

            { hasSearchQuery &&
                <SearchParamButton>

                    Search: {searchParams.get('searchQuery')}

                    <button onClick={ () => updateSearchParam('searchQuery', '')}>
                        <CloseIcon size={18} />
                    </button>

                </SearchParamButton>
            }

            { filterByParam !== 'all' && (
                <SearchParamButton hasSearchQuery={hasSearchQuery}>

                    Filter: {filterIsTag && '#'}{filterBy}

                    <button onClick={ () => updateSearchParam('filterBy', 'all')}>
                        <CloseIcon size={18} />
                    </button>

                </SearchParamButton>
            )}

        </div>
    )
}