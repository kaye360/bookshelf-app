import { Book } from "../../../types/types"
import { isArray } from "../../../utils/validation"

interface SortedTagsWithCounts {
    tag: string
    count : number
}

export function getTagsFromBookList(books : Book[]) : SortedTagsWithCounts[]  {
    
    if(!isArray(books)) {
        return []
    }

    const tags = books.map( book => book.tags ).flat()

    const tagsWithCounts: SortedTagsWithCounts[] = []

    tags.forEach( tag => {
        const index = tagsWithCounts.findIndex( tagWithCount => tagWithCount.tag === tag )

        if( index === -1) {
            tagsWithCounts.push({tag, count : 1})
        } else {
            const count = tagsWithCounts[index].count + 1
            tagsWithCounts[index] = {tag, count}
        }
    })

    const sortedTags = tagsWithCounts.sort( (a,b) => a.count < b.count ? 1 : -1)

    return sortedTags
}
