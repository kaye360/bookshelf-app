import BookGridItem from "../../features/bookshelf/components/BookGridItem";
import BaseLayout from "../../layouts/BaseLayout";
import DashboardSection from "../../features/dashboard/components/DashboardSection";
import { useAuth } from "../../features/auth/hooks/useAuth";


export default function Dashboard() {

    const {user} = useAuth()
    const books  = user?.books ? user.books : []

    return (
        <BaseLayout>

            <div className="grid grid-cols-[1fr_0.6fr]">
                <div>
                    <p className="text-xl my-8">
                        Welcome {user?.name} 
                    </p>

                    <h2 className="font-semibold text-2xl mb-3">
                        Currently Reading
                    </h2>

                    <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, dignissimos et? Obcaecati, et vitae laborum rerum eum incidunt recusandae inventore sequi architecto minima doloremque ex facere exercitationem autem sit cupiditate.</p>
                </div>

                <img src="/bookshelf.png" className="" />
            </div>

            <div className="grid gap-8">
                
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



        </BaseLayout>
    )
}
