import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/form/Button";
import BaseLayout from "../../../layouts/BaseLayout";
import { APP_NAME } from "../../../config";
import TextFlow from "../../../components/common/TextFlow";
import Paragraph from "../../../components/common/Paragraph";
import { ArrowDownIcon, ArrowRightIcon, BookmarkIcon, CheckIcon, HashIcon, SearchIcon, UserIcon, UserPlusIcon } from "../../../components/common/Icon";
import useScrollToElement from "../../../hooks/useScrollToElement";
import H2 from "../../../components/common/H2";
import { useCommunityPosts } from "../../community/api/getCommunityPost";
import BookCover from "../../../components/common/BookCover";
import { useStore } from "../../../store/store";

export default function Home() {

    const { auth }  = useStore()
    const navigate  = useNavigate()
    const welcome   = useScrollToElement()
    const community = useCommunityPosts()

    const communityNewestPosts = community.data 
        ? community.data
            .filter( post => post.type === 'CREATE_BOOK')
            .sort(() => Math.random() - 0.5)
            .slice(0,20) 
        : []

    const communityNewestUsers = community.data 
        ? community.data
            .filter( post => post.type === 'JOIN')
            .slice(0,10)
        : []

    return (
        <BaseLayout title="">

            <section
                className="relative grid md:flex md:items-center md:w-fit mx-auto mb-12 mt-6 md:mt-0 min-h-[70vh] md:min-h-[50vh]"
            >
                <div className="flex flex-col gap-5 md:items-start max-w-[550px] md:translate-x-10 order-2 md:order-1">
                    <span className="font-base text-4xl leading-[3rem] pointer-events-none select-none">
                        <I>Discover</I>, <I>organize,</I> and <I>share</I> your book collection
                    </span>

                    <span className="max-w-[450px] pointer-events-none select-none">
                        Whether you are just getting started or have read for a lifetime, keep your personal library in order with {APP_NAME}!
                    </span>

                    <div className="grid md:flex md:items-center gap-3">
                        { auth.isAuth ? (
                            <Button onClick={ () => navigate('/dashboard')}>
                                Continue to Dashboard
                                <ArrowRightIcon />
                            </Button>
                        ) : (
                            <>
                                <Button onClick={ () => navigate('/register')}>
                                    <CheckIcon />
                                    Join Now
                                </Button>
                                <Button variant="outline" onClick={ welcome.scrollTo }>
                                    <ArrowDownIcon />
                                    Learn More
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <img 
                    src="/hero.png" 
                    width="300"
                    height="300"
                    className="w-full md:w-fit h-[150px] md:h-auto object-cover md:-translate-x-10 order-1 md:order-2"
                />

                <img
                    src="/hero-book-1.png"
                    width="90"
                    height="63"
                    className="absolute -left-40 top-12 -rotate-12 opacity-40"
                />
                <img
                    src="/hero-book-3.png"
                    width="90"
                    height="63"
                    className="absolute -left-12 -bottom-4 opacity-40"
                />

            </section>

            <section
                ref={welcome.scrollRef}
                className="relative bg-primary-dark bg-[url('/bookshelf-opacity-10.png')] bg-fixed bg-blend-overlay py-12 px-8 rounded text-bg mb-12"
            >
                <div className="relative z-10 max-w-[500px] mx-auto">
                    <TextFlow>

                        <h1 className="text-3xl ">
                            Welcome to <span className="font-theme">{APP_NAME}!</span>
                        </h1>

                        <Paragraph>
                            {APP_NAME} is your ultimate companion for all things reading! Whether you're an avid reader with a sprawling library or just getting started on your literary journey, our app is designed to help you effortlessly organize, track, and discover books. 
                        </Paragraph>

                        <Paragraph>
                            With an intuitive interface and powerful features, managing your collection has never been easier. Dive into a world of personalized recommendations, insightful reading statistics, and a vibrant community of fellow book enthusiasts.
                        </Paragraph>

                    </TextFlow>
                </div>

            </section>

            <section
                className="grid md:grid-cols-2 items-center gap-6 md:gap-12 mb-12 md:mb-24"
            >

                <div>
                    <img
                        src="/mockup-organize.png"
                        className="border border-primary-light rounded-lg p-4"
                    />
                </div>

                <TextFlow>
                    <H2 className="flex items-center gap-1">
                        <BookmarkIcon />
                        Organize Your Collection
                    </H2>
                    <Paragraph>
                        Effortlessly catalog your entire library. Add books by scanning their ISBN, searching online databases, or entering details manually.
                    </Paragraph>
                    <H2 className="flex items-center gap-1">
                        <SearchIcon />
                        Discover New Reads
                    </H2>
                    <Paragraph>
                        Explore personalized recommendations based on your reading history and preferences. Stay up-to-date with the latest releases and timeless classics.
                    </Paragraph>
                    <Button
                        variant="outline"
                        onClick={ () => navigate('/register')}
                    >
                        Join Today!
                        <ArrowRightIcon />
                    </Button>
                </TextFlow>

            </section>

            <section
                className="grid md:grid-cols-2 items-center gap-6 md:gap-12 mb-24"
            >

                <TextFlow>
                    <H2 className="flex items-center gap-1">
                        <HashIcon />
                        Personalized Tags
                    </H2>
                    <Paragraph>
                        Customize your collection with personalized tags. Remember why you loved (or didn't love) a book and find your favorites easily.
                    </Paragraph>
                    <H2 className="flex items-center gap-1">
                        <UserIcon />
                        Connect with Fellow Readers
                    </H2>
                    <Paragraph>
                        Join a community of book lovers. Share reviews, discuss books, and get inspired by what others are reading.
                    </Paragraph>
                    <Button
                        variant="outline"
                        onClick={ () => navigate('/community')}
                    >
                        View the Community
                        <ArrowRightIcon />
                    </Button>
                </TextFlow>

                <div className="bg-primary-light/20 rounded-lg p-4">
                    <img
                        src="/mockup-community.png"
                        width="175"
                        height="350"
                        className="mx-auto"
                    />
                </div>

            </section>

            <section className="bg-primary-light/20 rounded-lg py-8">
                <H2 className="px-8 mb-8">
                    Our Community
                </H2>

                <div className="overflow-hidden mb-16">
                    <div className="flex gap-4 animate-marquee">
                        { communityNewestPosts.map( post => (
                            <Link 
                                to={`/book/${post.key}`} 
                                key={post.id}
                                className="border-0 hover:scale-105 duration-200 origin-bottom"
                            >
                                <BookCover 
                                    size="md"
                                    title={post.title}
                                    src={post.imageUrl}
                                />
                                <div className="text-xs leading-4 overflow-hidden mt-1">
                                    Added by: <br />
                                    {post.userHandle}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 px-6">

                    <ul className="grid gap-6">
                        {communityNewestUsers.map( user => (
                            <li className="flex items-center gap-2" key={user.id}>
                                <UserPlusIcon />
                                <Link 
                                    to={`/user/${user.userHandle}`}
                                    className="border border-primary-light/50 rounded-md px-2 py-1"
                                >
                                    {user.userHandle}
                                </Link>
                                <span>
                                    joined on
                                    &nbsp;{ new Date(user.created_at).toDateString().split(' ').slice(0, -1).join(' ') }
                                </span>
                            </li>
                        ))}
                    </ul>

                    <img 
                        src="/illustrations/reader-cloudy.png"
                        width="300"
                        height="300"
                        className="rounded-xl w-full h-[300px] object-cover"
                    />

                </div>

            </section>

        </BaseLayout>
    )
}

function I({
    children
} : {
    children : any
}) {
    return (
        <span
            className="relative italic after:absolute after:inset-[auto_0_2px_] after:bg-accent/50 after:h-[2px]"
        >
            {children}
        </span>
    )
}