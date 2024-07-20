import H1 from "../../components/common/H1";
import BaseLayout from "../../layouts/BaseLayout";
import CommunityPost from "./components/CommunityPost";
import { LoaderIcon } from "../../components/common/Icon";
import useInfiniteCommunityPosts from "./hooks/useInfiniteCommunityPosts";


export default function Community() {

    const {
        posts,
        hasPosts,
        containerRef
    } = useInfiniteCommunityPosts()

    return (
        <BaseLayout>
            <H1>
                Browse the Community
            </H1>

            <div className="grid gap-8">
                { posts.map( (post, i) => (
                    <CommunityPost post={post}  key={i} />
                ))}
            </div>

            { hasPosts && (
                <div 
                    ref={containerRef}
                    className="flex items-center gap-2 text-xl pt-12"
                >
                <LoaderIcon />
                Loading...
            </div>
            )}


        </BaseLayout>
    )
} 