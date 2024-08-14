import { VALID_FILTERS, VALID_SORTS, VALID_VIEWS } from "../../../config";
import { UserSettings } from "../../../types/types";

export function isValidView(viewAs: any) : viewAs is UserSettings['view'] {
    return VALID_VIEWS.includes( viewAs ) && viewAs !== null
}

export function isValidFilter(filterBy: any) : filterBy is UserSettings['filter'] {
    return VALID_FILTERS.includes( filterBy ) && filterBy !== null
}

export function isValidSort(sortBy: any) : sortBy is UserSettings['sort'] {
    return VALID_SORTS.includes( sortBy ) && sortBy !== null
}