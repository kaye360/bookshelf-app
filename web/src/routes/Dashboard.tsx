import BookGridItem from "../features/bookshelf/components/BookGridItem";
import BaseLayout from "../layouts/BaseLayout";
import { useStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import { BookIcon } from "../components/common/Icon";
import Heading from "../features/dashboard/components/Heading";
import Section from "../features/dashboard/components/Section";
import Slider from "../features/dashboard/components/Slider";
import Loader from "../features/dashboard/components/Loader";
import { getTagsFromBookList } from "../features/tags/services/getTagsFromBookList";


export default function Dashboard() {

    const { 
        auth : { user },
        books,
        settings
    } = useStore()

    const navigate = useNavigate()

    const currentlyReading = books.filter( book => book.id.toString() === settings?.currentlyReadingId)[0]

    const tags = getTagsFromBookList(books)

    return (
        <BaseLayout>


            <Section className="grid md:grid-cols-2 gap-6 md:gap-24 items-center md:mt-6 mb-8 md:mb-16 mx-auto w-fit">

                <div>
                    <p className="text-xl mb-5 italic self-center">
                        Welcome back <strong>{user?.name} </strong>
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
                    <div className="grid grid-cols-[150px_1fr] gap-2">
                        
                        <img src={currentlyReading.image.url} className="w-full" />

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

                <Loader />

                <Slider>
                    { books
                        .sort( (a,b) => a.created_at < b.created_at ? 1 : -1 )
                        .slice(0,8)
                        .map( book => (
                            <BookGridItem book={book} />
                    ))}
                </Slider>
            </Section>

            <Section>
                <Heading>
                    Your Favourite Reads
                </Heading>

                <Loader />

                <Slider>
                    { books
                        .filter( book => !!book.isFavourite )
                        .sort( () => Math.random() - 0.5 )
                        .slice(0,8)
                        .map( book => (
                            <BookGridItem book={book} />
                    ))}
                </Slider>
            </Section>


            <Section>
                <Heading>
                    Your Favourite Topics
                </Heading>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    { tags
                        .slice(0,20)
                        .map( tag => (
                            <Link 
                                to={`/bookshelf/tag/${tag.tag}`}
                                className="p-3 md:p-8 hover:bg-primary-light/30 rounded-lg border border-primary-light/60 hover:border-primary-light text-center"
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
            </Section>


            <Section>
                <Heading>
                    New in the Community
                </Heading>

                <p>
                    Coming soon
                </p>
            </Section>


        </BaseLayout>
    )
}
