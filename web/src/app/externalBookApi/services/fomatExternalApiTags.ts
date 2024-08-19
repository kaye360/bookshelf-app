import { ExternalApiDoc } from "../../../types/types";
import { isArrayOfStrings } from "../../../utils/validation";

export function formatExternalApiTags( subjects : ExternalApiDoc['subject'] ) {

    if( !isArrayOfStrings(subjects) ) return []

    const tags = subjects
        .filter( sub => sub.length > 4 && !/\d/.test(sub) )
        .sort( (a,b) => a.length > b.length ? 1 : -1)
        .slice(0,5) 
        .map(tag => tag.toLowerCase().replaceAll(' ', '-').replaceAll(',', ''))

    return Array.from( new Set( tags ) )
}