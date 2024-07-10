import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect } from "react";
import AccountForm from "../features/auth/components/AccountForm";
import { useStore } from "../store/store";


export default function Index() {

    const navigate = useNavigate()
    const { auth } = useStore()

    useEffect( () => {
        if( auth.isAuth ) {
            setTimeout( () => navigate('/dashboard'), 1000 )
        }
    },[auth.isAuth])

    const location    = useLocation()
    const pathName    = location.pathname.replaceAll('/', '')
    const defaultForm = pathName === 'register' ? 'register' : 'login'

    return (
        <BaseLayout>
            <AccountForm defaultForm={defaultForm} />
        </BaseLayout>
    )
} 