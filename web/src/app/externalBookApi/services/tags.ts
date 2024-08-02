import { ExternalApiDoc } from "../../../types/types";

export function formatExternalApiTags( subject : ExternalApiDoc['subject'] ) {

    const tags = subject
        .filter( sub => sub.length > 4 && !/\d/.test(sub) )
        .sort( (a,b) => a.length > b.length ? 1 : -1)
        .slice(0,5) 
        .map(tag => tag.toLowerCase().replaceAll(' ', '-').replaceAll(',', ''))

    return Array.from( new Set( tags ) )
}