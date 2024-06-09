import BookGridItem from "../../features/bookshelf/components/BookGridItem";
import BaseLayout from "../../layouts/BaseLayout";
import { useAuth } from "../../features/auth/components/AuthProvider";
import DashboardSection from "../../features/dashboard/components/DashboardSection";
import ErrorToast from "../../components/error/ErrorToast";
import { useState } from "react";

export default function Dashboard() {
    const {user} = useAuth()

    const books = user?.books ? user.books : []

    const [a, b] = useState(false)

    return (
        <BaseLayout>
            <button onClick={() => b(p => !p)}>
                click me pop {a ? 'show' : 'hide'}
            </button>

            <p className="text-xl my-8">
                Welcome {user?.name} 
            </p>

            <div className="grid gap-8">

                <DashboardSection title="Currently Reading">
                    <p className=" col-span-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, dignissimos et? Obcaecati, et vitae laborum rerum eum incidunt recusandae inventore sequi architecto minima doloremque ex facere exercitationem autem sit cupiditate.</p>
                </DashboardSection>
                
                <DashboardSection title="Recently Added">
                    {books && books.slice(0,10).map( book => (
                        <BookGridItem book={book} key={book.id} hideUserActions />
                    ))}
                </DashboardSection>

                <DashboardSection title="My Favourites">
                    { books && books.filter( book => book.isFavourite ).slice(0,10).map( book => (
                        <BookGridItem book={book} key={book.id} hideUserActions />
                    ))}
                </DashboardSection>

                <DashboardSection title="Tags">
                    <div className="flex gap-4 text-lg font-medium">
                        <span className="px-3 py-1 border rounded-md">
                            #history
                        </span>
                        <span className="px-3 py-1 border rounded-md">
                            #science
                        </span>
                        <span className="px-3 py-1 border rounded-md">
                            #biology
                        </span>
                        <span className="px-3 py-1 border rounded-md">
                            #technology
                        </span>
                        <span className="px-3 py-1 border rounded-md">
                            #political science
                        </span>
                    </div>
                </DashboardSection>

            </div>



            <ErrorToast 
                isShown={a}
                message="Massive poopies were pooped. Massive poopies were pooped. "
            />

        </BaseLayout>
    )
}
