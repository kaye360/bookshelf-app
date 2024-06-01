import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link 
            to="/"
            className="flex items-center gap-0 w-fit font-theme text-xl tracking-tight text-secondary-700 relative after:absolute after:content-[''] after:inset-[auto_0_2px_0] after:-z-10 after:border-b-4 after:border-accent hover:border-transparent"
        >
            Bookshelf
        </Link>
    )
}
