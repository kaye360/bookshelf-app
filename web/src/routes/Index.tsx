import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import AccountForm from "../features/auth/components/AccountForm";


export default function Index() {

    const navigate   = useNavigate()
    const { isAuth } = useAuth()

    useEffect( () => {
        if( isAuth ) navigate('/dashboard')
    },[isAuth])

    const location    = useLocation()
    const pathName    = location.pathname.replaceAll('/', '')
    const defaultForm = pathName === 'register' ? 'register' : 'login'

    return (
        <BaseLayout>
            <AccountForm defaultForm={defaultForm} />
        </BaseLayout>
    )
} 