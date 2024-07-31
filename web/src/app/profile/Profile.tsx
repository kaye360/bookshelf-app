import { Link, useLocation } from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout";
import H1 from "../../components/common/H1";
import { useStore } from "../../store/store";
import { AlertIcon, BookIcon, LocationIcon, UserIcon } from "../../components/common/Icon";
import { useProfile } from "./api/getProfile";
import { useEffect } from "react";
import BookCover from "../../components/common/BookCover";
import SectionHeading from "../../components/common/SectionHeading";
import Loader from "../../components/common/Loader";

export default function Profile() {

    const { auth : { user : authUser } } = useStore()
    const {pathname} = useLocation()

    const user = pathname === '/user' || pathname === '/user/'
        ? authUser?.handle
        : pathname.split('/').at(-1)

    const profileQuery = useProfile(user)

    useEffect( () => {
        profileQuery.refetch()
    }, [user])

    return (
        <BaseLayout>
            <H1>
                {user}
            </H1>

            { profileQuery.isSuccess && (
                <>
                    <section className="grid gap-3">
                        <div className="flex items-center gap-1">
                            <LocationIcon /> {profileQuery.data?.location || 'None'}
                        </div>
                        <div className="flex items-center gap-1">
                            <UserIcon /> Joined { profileQuery.data?.joined }
                        </div>
                        <div className="flex items-center gap-1">
                            <BookIcon /> { profileQuery.data.totalBooks } books
                        </div>
                    </section>

                    <section className="mt-10">
                        <SectionHeading>
                            Some of {user}'s books
                        </SectionHeading>

                        <div className="grid grid-cols-[repeat(auto-fill,100px)] gap-x-4 gap-y-4">
                            { profileQuery.data?.books.map( book => (
                                <BookCover 
                                    src={book.imageUrl}
                                    title={book.title}
                                    size={"md"}
                                    key={book.key}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="mt-10">
                        <SectionHeading>
                            {user}'s popular topics
                        </SectionHeading>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            { profileQuery.data?.tags.map( tag => (
                                <Link 
                                    to={`/add?q=${tag}`}
                                    className="p-3 md:p-8 hover:bg-primary-light/30 rounded-lg border border-primary-light/60 hover:border-primary-light text-center"
                                    key={tag}
                                >
                                    <span className="text-lg md:text-xl">
                                        #{tag} <br />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                </>
            ) }

            { profileQuery.isLoading && (
                <Loader message="Loading profile..." />
            )}

            { profileQuery.isError && (
                <div className="flex items-center gap-2 text-xl py-8">
                    <AlertIcon /> Error: User not found
                </div>
            )}

        </BaseLayout>
    )
} 