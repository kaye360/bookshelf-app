import { useLocation, useNavigate } from "react-router-dom";
import LoginOrRegisterForm from "../features/auth/components/LoginOrRegisterForm";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";


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
            <LoginOrRegisterForm defaultForm={defaultForm} />
        </BaseLayout>
    )
} 