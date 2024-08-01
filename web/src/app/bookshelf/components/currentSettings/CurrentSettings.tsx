import { CloseIcon } from "../../../../components/common/Icon"
import { UserSettings } from "../../../../types/types"
import { StringUtils } from "../../../../utils/string"
import SettingsMenuButton from "./SettingsMenuButton"
import SearchParamButton from "./SearchParamButton"
import { useStore } from "../../../../store/store"
import { useBookshelfContext } from "../../hooks/useBookShelfContext"

export default function CurrentSettings({
    setShowFilters
} : {
    setShowFilters : React.Dispatch<React.SetStateAction<boolean>>
}) {

    const { settings } = useStore()
    const {searchParams, updateSearchParam} = useBookshelfContext()

    const currentParams = {
        search : searchParams.get('searchQuery') || '',
        view   : searchParams.get('viewAs'),
        sort   : searchParams.get('sortBy') || settings?.sort,
        filter : searchParams.get('filterBy') || settings?.filter
    }

    const hasSearchQuery = typeof currentParams.search === 'string' && currentParams.search.length > 0

    const viewAs = StringUtils.capitalize( currentParams.view )
    const sortBy = currentParams.sort as UserSettings['sort']

    const filterIsTag = !['all', 'read', 'unread', 'favourites', 'owned', 'wishlist']
        .includes( currentParams.filter )

    const filterBy = filterIsTag 
        ? currentParams.filter
        : StringUtils.capitalize(currentParams.filter)
        
    const sortTitles : { [key in UserSettings['sort']] : string } = {
        title   : 'Title A-Z',
        authors : 'Authors A-Z',
        newest  : 'Newest First',
        oldest  : 'Oldest First'
    }
    
    return (
        <div className="flex items-stretch gap-2 flex-wrap mt-1">

            <SettingsMenuButton setShowFilters={setShowFilters} />

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

            { currentParams.filter !== 'all' && (
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