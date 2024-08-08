import H1 from "../../../components/common/H1";
import H2 from "../../../components/common/H2";
import { BookIcon, GlobeIcon, SearchIcon, UserIcon } from "../../../components/common/Icon";
import TextFlow from "../../../components/common/TextFlow";
import { APP_NAME } from "../../../config";
import BaseLayout from "../../../layouts/BaseLayout";

export default function About() {
    return (
        <BaseLayout title="About">

            <section className="grid md:grid-cols-2 items-center gap-6">

                <TextFlow>
                    <H1>About {APP_NAME}</H1>
                    <p>
                        Bookshelf.app is your ultimate companion for all things reading! Whether you're an avid reader with a sprawling library or just getting started on your literary journey, our app is designed to help you effortlessly organize, track, and discover books.
                    </p>
                    <p>
                        With an intuitive interface and powerful features, managing your collection has never been easier. Dive into a world of personalized recommendations, insightful reading statistics, and a vibrant community of fellow book enthusiasts.
                    </p>
                </TextFlow>

                <img 
                    src="/illustrations/book_coffee_plant_1.webp"
                    width={400}
                    height={400}
                />

            </section>

            <section className="mt-12">
                    <H2>
                        App Features
                    </H2>
                <TextFlow>

                    <ul className="grid gap-6">
                        <li>
                            <h3 className="flex items-center gap-1 font-bold">
                                <SearchIcon />
                                Search books
                            </h3>
                            <p>
                                Search <a href="https://openlibrary.org/" target="_blank">OpenLibrary.org</a> for millions of books, authors, topics and more via their API.
                            </p>
                        </li>
                        <li>
                            <h3 className="flex items-center gap-1 font-bold">
                                <BookIcon />
                                Create your personalized bookshelf
                            </h3>
                            <p>
                                Add, sort, filter, search, tag, and group books to make managing your bookshelf easy
                            </p>
                        </li>
                        <li>
                            <h3 className="flex items-center gap-1 font-bold">
                                <UserIcon />
                                Share with friends
                            </h3>
                            <p>
                                Customize your user profile and let others view your book collection
                            </p>
                        </li>
                        <li>
                            <h3 className="flex items-center gap-1 font-bold">
                                <GlobeIcon />
                                Join a community of book lovers
                            </h3>
                            <p>
                                View the community feed and see what everyone else is up to
                            </p>
                        </li>
                    </ul>

                </TextFlow>
            </section>

            <section className="mt-12">
                <H2>
                    Developer Info
                </H2>

                <TextFlow>

                    <p>
                        This app is a custom project by <a href="https://joshkaye.dev" target="_blank">Josh Kaye</a>
                    </p>

                    <div>
                        <p>
                            The following tech was used to create this project:
                        </p>
                        <ul className="pl-6 list-disc">
                            <li>
                                <b>Backend:</b> PHP, MYSQL, Laravel
                            </li>
                            <li>
                                <b>Frontend:</b> React, Zustand, Tanstack Query, React-Router, Yup Validation
                            </li>
                            <li>
                                <b>UI:</b> Figma, Midjourney AI
                            </li>
                            <li>
                                <b>Deploy:</b> Github, Netlify, Laravel Vapor
                            </li>
                            <li>
                                <b>API:</b> OpenLibrary.org api
                            </li>
                        </ul>
                    </div>

                    <a 
                        href="https://github.com/kaye360/bookshelf-app" 
                        target="_blank"
                        className="inline-block"
                    >
                        View the code repository on GitHub
                    </a>

                </TextFlow>
            </section>

            <section className="mt-12">

                <H2>Upcoming Features</H2>

                <ul className="list-disc pl-6">
                    <li>Recommended books, authors, topics</li>
                    <li>Book Reviews</li>
                    <li>Follow users and topics</li>
                    <li>User statistics (most read authors, topics, etc)</li>
                    <li>User scoring system</li>
                </ul>
            </section>

            <img 
                src="/illustrations/book_coffee_plant_2.webp"
                width={400}
                height={400}
                className="mx-auto"
            />

        </BaseLayout>
    )
}
