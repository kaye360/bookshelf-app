

export function extractTagsFromInput(input : string) : string[] {

    if( typeof input !== 'string') {
        throw new Error(`Invalid input in extractTagsFromInput: ${input}`)
    }

    const tags      = new Set( input.trim().toLowerCase().split(' ').filter( tag => tag !== "") )
    const tagsArray = Array.from( tags )

    return tagsArray
}
