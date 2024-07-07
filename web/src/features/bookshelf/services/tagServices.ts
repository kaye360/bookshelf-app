

export function extractTagsFromInput(input : HTMLTextAreaElement) : string[] {

    const tags      = new Set( input.value.trim().toLowerCase().split(' ').filter( tag => tag !== "") )
    const tagsArray = Array.from( tags )

    return tagsArray
}
