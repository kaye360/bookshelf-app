import { CommunityPost } from "../../../types/types"
import { isArray } from "../../../utils/validation"


export function bundlePosts(posts : CommunityPost[] | undefined) : CommunityPost[][] {

    if( !posts || !isArray(posts) ) return []

    // @ts-ignore
    const bundleByUser = Object.groupBy(posts, ({ userHandle }) => userHandle ) as object

    const bundleByType = Object.values(bundleByUser)
        // @ts-ignore
        .map( user => Object.values( Object.groupBy( user, ({ type }) => type )) )
        .flat()
        .sort( () => Math.random() - 0.5 )

    return bundleByType as CommunityPost[][]
}