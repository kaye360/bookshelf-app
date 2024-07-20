import { Link } from "react-router-dom"
import Avatar from "../../../components/common/Avatar"
import { CommunityPost as Post } from "../../../types/types"
import Tooltip from "../../../components/common/Tooltip"


type Action = {
    [key in Post['type']]: string
}


const MAX_POSTS = 8


export default function CommunityPost({
    post
} : {
    post : Post[]
}) {

    const { userHandle, type }  = post[0]

    const action : Action = {
        'CREATE_BOOK'    : `added ${post.length === 1 ? 'a new book' : `${post.length} new books`}`,
        'CREATE_REVIEW'  : `reviewed ${post.length === 1 ?  'a book' : `${post.length} books`}`,
        'FAVOURITE_BOOK' : `favourited ${post.length === 1 ? 'a book' : `${post.length} books`}`,
        'READ_BOOK'      : `read ${post.length === 1 ? 'a book' : `${post.length} books`}`,
        'JOIN'           : 'joined BookShelf!',
    }

    return (
        <div className="border border-primary-light/50 rounded-lg px-5 py-8 shadow-sm shadow-primary-light/50">
            <h3 
                className="flex items-center gap-1 mb-3 font-medium"
            >
                <Avatar handle={userHandle} />

                <span>
                    <Link 
                        to={`/user/${userHandle}`}
                        className="italic"
                    >
                        {userHandle}
                    </Link> 
                    &nbsp;
                    {action[type]}
                </span>
            </h3>

            <div className="flex items-stretch gap-4 flex-wrap">

                { post.slice(0,MAX_POSTS).map( singlePost => (
                    <Tooltip title={singlePost.title} key={singlePost.id}>
                        <Link to={`/book/${singlePost.key}`}>
                            <div className="grid gap-1 h-full">
                                {singlePost.imageUrl && (
                                    <div className="relative h-full">
                                        <img 
                                            src={singlePost.imageUrl} 
                                            className="max-w-[65px] md:max-w-[80px] h-full object-cover"
                                            loading="lazy"
                                            width={80}
                                            height={130}
                                        />
                                        <div className="absolute inset-0 -z-30 bg-primary-light/60 animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </Link>
                    </Tooltip>
                ))}

                { post.length > MAX_POSTS && (
                    <div className=" flex items-center px-8 rounded-md">
                        + {post.length - MAX_POSTS} more
                    </div>
                )}

            </div>
        </div>
    )
}
