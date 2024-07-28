import { Link } from "react-router-dom"
import Avatar from "../../../components/common/Avatar"
import { CommunityPost as Post } from "../../../types/types"
import Tooltip from "../../../components/common/Tooltip"
import BookCover from "../../../components/common/BookCover"
import { UserPlusIcon } from "../../../components/common/Icon"


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

            { post[0].type !== 'JOIN' ? (
                <div className="flex items-stretch gap-4 flex-wrap">

                    { post.slice(0,MAX_POSTS).map( singlePost => (
                        <Tooltip title={singlePost.title} key={singlePost.id}>
                            <Link to={`/book/${singlePost.key}`}>
                                <BookCover size='md' src={singlePost.imageUrl} title={singlePost.title} />
                            </Link>
                        </Tooltip>
                    ))}

                    { post.length > MAX_POSTS && (
                        <div className=" flex items-center px-8 rounded-md">
                            + {post.length - MAX_POSTS} more
                        </div>
                    )}

                </div>
            ) : (
                <div className="px-8 py-5 rounded-md w-fit bg-primary-light/30">
                    <UserPlusIcon size={36} className=" stroke-primary-dark/50" />
                </div>
            )}

        </div>
    )
}
