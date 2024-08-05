import BookGridItem from "../../bookshelf/components/views/BookGridItem";
import BaseLayout from "../../../layouts/BaseLayout";
import { useStore } from "../../../store/store";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/form/Button";
import { BookIcon, PlusIcon } from "../../../components/common/Icon";
import Heading from "../components/Heading";
import Section from "../components/Section";
import Slider from "../components/Slider";
import { getTagsFromBookList } from "../../tags/services/getTagsFromBookList";
import { useCommunityPosts } from "../../community/api/getCommunityPost";
import BookCover from "../../../components/common/BookCover";
import Loader from "../../../components/common/Loader";

export default function Dashboard() {

    const { books, booksStatus, settings } = useStore()

    const navigate = useNavigate()

    const community = useCommunityPosts()
    const communityNewestPosts = community.data ? community.data
        .filter( post => post.type === 'CREATE_BOOK')
        .slice(0,10) : []

    const currentlyReading = books
        .filter( book => book.id.toString() === settings?.currentlyReadingId)[0]
    
    const favouriteBooks = books
        .filter( book => !!book.isFavourite )

    const tags = getTagsFromBookList(books)

    return (
        <BaseLayout>

            <Section className="grid md:grid-cols-2 gap-6 md:gap-24 items-center md:mt-12 mb-8 md:mb-28 mx-auto w-fit">

                <div>
                    <p className="text-xl mb-3 italic text-center">
                        Welcome back <strong>{settings?.name} </strong>
                    </p>

                    <Button 
                        variant="fill"
                        onClick={ () => navigate('/bookshelf')}
                        className="w-full"
                    >
                        <BookIcon />
                        View Your Bookshelf
                    </Button>
                </div>

                <img 
                    src="/illustrations/book_coffee_plant_1.webp" 
                    width={400}
                    height={400}
                    className="w-full max-w-[200px] md:max-w-[300px] aspect-square mx-auto" 
                />

            </Section>

            <Section>

                <Heading>
                    Currently Reading
                </Heading>

                { currentlyReading ? (
                    <div className="grid grid-cols-[auto_1fr] gap-2">
                        
                        { currentlyReading.imageUrl && (
                            <BookCover
                                size="md"
                                title={currentlyReading.title}
                                src={currentlyReading.imageUrl}
                            />
                        )}


                        <div>
                            <h3 className="text-xl font-semibold">
                                {currentlyReading.title}
                            </h3>

                            <span>
                                {currentlyReading.authors}
                            </span>
                        </div>


                    </div>
                ) : (
                    <p>
                        You are not currently reading anything. 
                    </p>
                )}
                
            </Section>

            <Section>
                <Heading>
                    New to Your Bookshelf
                </Heading>

                { booksStatus === 'LOADING' && (
                    <Loader />
                )}

                { books.length > 0 && (
                    <Slider>
                        { books
                            .sort( (a,b) => a.created_at < b.created_at ? 1 : -1 )
                            .slice(0,8)
                            .map( book => (
                                <Link 
                                    to={`/book/${book.key}`} 
                                    key={book.id}
                                    className="border-0 hover:scale-105 duration-200"
                                >
                                    <BookGridItem book={book} hideUserActions />
                                </Link>
                        ))}
                    </Slider>
                )}

                { books.length === 0 && (
                    <div className="flex items-start flex-wrap gap-2 py-8 bg-primary-light/20 rounded-md px-2">
                        Your Library is empty.
                        <Link to="/add" className="flex items-center gap-1 w-fit"> 
                            <PlusIcon size={16} />
                            Add some books
                        </Link>
                    </div>
                )}
            </Section>

            <Section>
                <Heading>
                    Your Favourite Reads
                </Heading>

                { booksStatus === 'LOADING' && (
                    <Loader />
                )}

                { favouriteBooks.length > 0 && (
                    <Slider>
                        { favouriteBooks
                            .sort( () => Math.random() - 0.5 )
                            .slice(0,8)
                            .map( book => (
                                <Link 
                                    to={`/book/${book.key}`} 
                                    key={book.id}
                                    className="border-0 hover:scale-105 duration-200"
                                >
                                    <BookGridItem book={book} hideUserActions />
                                </Link>
                        ))}
                    </Slider>
                )}

                { favouriteBooks.length === 0 && (
                    <div className="flex items-start flex-wrap gap-2 py-8 bg-primary-light/20 rounded-md px-2">
                        You don't have any favourite books.
                        <Link to="/bookshelf" className="flex items-center gap-1 w-fit"> 
                            <BookIcon size={16} />
                            View your bookshelf
                        </Link>
                    </div>
                )}
            </Section>


            <Section>
                <Heading>
                    Your Favourite Topics
                </Heading>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    { tags
                        .slice(0,15)
                        .map( tag => (
                            <Link 
                                to={`/bookshelf?filterBy=${tag.tag}`}
                                className="p-3 md:p-8 hover:bg-primary-light/30 rounded-lg border border-primary-light/60 hover:border-primary-light text-center"
                                key={tag.tag}
                            >
                                <span className="text-lg md:text-xl">
                                    #{tag.tag} <br />
                                </span>
                                <span className="text-sm">
                                    ({tag.count} books)
                                </span>
                            </Link>
                    ))}
                </div>
                { tags.length === 0 && (
                    <div className="flex items-start flex-wrap gap-2 py-8 bg-primary-light/20 rounded-md px-2">
                        You don't have any favourite topics.
                        <Link to="/bookshelf" className="flex items-center gap-1 w-fit"> 
                            <BookIcon size={16} />
                            View your bookshelf
                        </Link>
                    </div>
                )}
            </Section>


            <Section>
                <Heading>
                    New in the Community
                </Heading>

                <Slider>

                    { communityNewestPosts.map( post => (
                            <Link 
                            to={`/book/${post.key}`} 
                            key={post.id}
                            className="border-0 hover:scale-105 duration-200"
                        >
                            <BookCover 
                                size="lg"
                                title={post.title}
                                src={post.imageUrl}
                            />
                        </Link>
                    ))}

                </Slider>

            </Section>


        </BaseLayout>
    )
}
