import { CloseIcon } from "../../../../components/common/Icon"
import { UserSettings } from "../../../../types/types"
import { StringUtils } from "../../../../utils/string"
import SettingsMenuButton from "./SettingsMenuButton"
import SearchParamButton from "./SearchParamButton"
import { useStore } from "../../../../store/store"
import useBookshelfParams from "../../hooks/useBookshelfParams"
import { isString } from "../../../../utils/validation"

export default function CurrentSettings({
    setShowSettingsMenu
} : {
    setShowSettingsMenu : React.Dispatch<React.SetStateAction<boolean>>
}) {

    const { settings } = useStore()
    const { searchParams, updateSearchParam, clearSearchParam } = useBookshelfParams()

    const currentParams = {
        search : searchParams.get('searchQuery') || '',
        view   : searchParams.get('viewAs') || settings.view,
        sort   : searchParams.get('sortBy') || settings?.sort,
        filter : searchParams.get('filterBy') || settings?.filter,
        tag    : searchParams.get('taggedAs')
    }

    const hasSearchQuery = isString(currentParams.search) && currentParams.search.length > 0
    const hasTag         = currentParams.tag !== null

    const viewAs   = StringUtils.capitalize( currentParams.view )
    const sortBy   = currentParams.sort as UserSettings['sort']
    const filterBy = StringUtils.capitalize(currentParams.filter)
    const taggedAs = currentParams.tag
        
    const sortTitles : { [key in UserSettings['sort']] : string } = {
        title   : 'Title A-Z',
        authors : 'Authors A-Z',
        newest  : 'Newest First',
        oldest  : 'Oldest First'
    }
    
    return (
        <div className="flex items-stretch gap-2 flex-wrap mt-1">

            <SettingsMenuButton setShowSettingsMenu={setShowSettingsMenu} />

            <SearchParamButton>
                View: { viewAs }
            </SearchParamButton>

            <SearchParamButton>
                Sort: {sortTitles[sortBy]} <br />
            </SearchParamButton>

            { hasSearchQuery &&
                <SearchParamButton>

                    Search: {searchParams.get('searchQuery')}

                    <button onClick={ () => clearSearchParam('searchQuery') }>
                        <CloseIcon size={18} />
                    </button>

                </SearchParamButton>
            }

            { hasTag && (
                <SearchParamButton disabled={hasSearchQuery}>
                    Tag: #{taggedAs}
                    <button onClick={ () => clearSearchParam('taggedAs') } >
                        <CloseIcon size={18} />
                    </button>
                </SearchParamButton>
            )}

            { currentParams.filter !== 'all' && (
                <SearchParamButton disabled={hasSearchQuery || hasTag}>

                    Filter: {filterBy}

                    <button onClick={ () => updateSearchParam('filterBy', 'all')}>
                        <CloseIcon size={18} />
                    </button>

                </SearchParamButton>
            )}

        </div>
    )
}