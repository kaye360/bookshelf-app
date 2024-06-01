import { useLocation, useNavigate } from "react-router-dom";
import LoginOrRegisterForm from "../components/auth/LoginOrRegisterForm";
import BaseLayout from "../layouts/BaseLayout";
import { useAuth } from "../lib/auth/AuthProvider";
import { useEffect } from "react";

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