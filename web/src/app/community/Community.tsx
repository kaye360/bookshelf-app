import H1 from "../../components/common/H1";
import BaseLayout from "../../layouts/BaseLayout";
import { CommunityPost as Post } from "../../types/types";
import { useCommunityPosts } from "./api/getCommunityPost";
import CommunityPost from "./components/CommunityPost";


export default function Community() {

    const query = useCommunityPosts()
    
    function bundlePosts(posts : Post[] | undefined) : Post[][] {

        if( !posts ) return []

        // @ts-ignore
        const bundleByUser = Object.groupBy(posts, ({ userHandle }) => userHandle ) as object

        const bundleByType = Object.values(bundleByUser)
            // @ts-ignore
            .map( user => Object.values( Object.groupBy( user, ({ type }) => type )) )
            .flat()
            .sort( () => Math.random() - 0.5 )

        return bundleByType as Post[][]
    }

    const bundledPosts = bundlePosts(query.data)

    return (
        <BaseLayout>
            <H1>
                Browse the Community
            </H1>

            <div className="grid gap-8">
                { bundledPosts.map( (post, i) => (
                    <CommunityPost post={post}  key={i} />
                ))}
            </div>

        </BaseLayout>
    )
} 