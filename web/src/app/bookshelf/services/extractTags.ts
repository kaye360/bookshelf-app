import { isString } from "../../../utils/validation"


export function extractTags(input : string) : string[] {

    if( !isString(input) ) {
        throw new Error(`Invalid input in extractTagsFromInput: ${input}`)
    }

    const tags      = new Set( input.trim().toLowerCase().split(' ').filter( tag => tag !== "") )
    const tagsArray = Array.from( tags )

    return tagsArray
}
