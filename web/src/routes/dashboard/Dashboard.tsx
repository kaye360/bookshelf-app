import H1 from "../../components/base/H1";
import BookGridItem from "../../components/book/BookGridItem";
import DashboardSection from "../../components/dashboard/DashboardSection";
import BaseLayout from "../../layouts/BaseLayout";
import { useAuth } from "../../lib/auth/AuthProvider";
import { UserBook } from "../../lib/book/types";

export default function Dashboard() {
    const {user} = useAuth()

    const books = user?.books ? user.books : []

    return (
        <BaseLayout>

            <H1>Dashboard</H1>

            <p className="text-xl mb-8">
                Welcome {user?.name} 
            </p>

            <div className="grid gap-8">

                <DashboardSection title="Currently Reading">
                    {/* <Book book={ book } /> */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, dignissimos et? Obcaecati, et vitae laborum rerum eum incidunt recusandae inventore sequi architecto minima doloremque ex facere exercitationem autem sit cupiditate.</p>
                </DashboardSection>
                
                <DashboardSection title="Recently Added">
                    {books && books.slice(0,10).map( book => (
                        <BookGridItem book={book} key={book.id} />
                    ))}
                </DashboardSection>

                <DashboardSection title="My Favourites">
                    { books && books.filter( book => book.isFavourite ).slice(0,10).map( book => (
                        <BookGridItem book={book} key={book.id} />
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

        </BaseLayout>
    )
}
