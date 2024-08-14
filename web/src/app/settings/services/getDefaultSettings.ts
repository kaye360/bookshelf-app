import { Settings } from "../../../types/types";
import { getLocalTheme } from "./localTheme";

export const getDefaultSettings = () : Settings => ({
    currentlyReadingId : null,
    email              : null,
    filter             : 'all',
    location           : null,
    name               : null,
    sort               : 'title',
    theme              : getLocalTheme(),
    view               : 'grid',
})

