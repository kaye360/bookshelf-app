import { Link } from "react-router-dom"
import Avatar from "../../../components/common/Avatar"
import { CommunityPost as Post } from "../../../types/types"
import Tooltip from "../../../components/common/Tooltip"

type Action = {
    [key in Post['type']]: string
}

export default function CommunityPost({
    post
} : {
    post : Post[]
}) {

    const { userHandle, type }  = post[0]

    const action : Action = {
        'CREATE_BOOK'    : `added ${post.length === 1 ? 'a new book' : `${post.length} new books`}`,
        'CREATE_REVIEW'  : 'reviewd a book',
        'FAVOURITE_BOOK' : 'favourited a book',
        'JOIN'           : 'joined BookShelf!',
        'READ_BOOK'      : 'read a book'
    }

    return (
        <div className="border border-primary-light/70 rounded-lg p-5 shadow-sm shadow-primary-light/50">
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

                { post.map( singlePost => (
                    <Tooltip title={singlePost.title}>
                        <Link to={`/book/${singlePost.id}`}>
                            <div className="grid gap-1" key={singlePost.id}>
                                {singlePost.imageUrl && (
                                    <img 
                                        src={singlePost.imageUrl} 
                                        className="max-w-[65px] md:max-w-[80px] h-full object-cover"
                                    />
                                )}
                            </div>
                        </Link>
                    </Tooltip>
                ))}

            </div>
        </div>
    )
}
