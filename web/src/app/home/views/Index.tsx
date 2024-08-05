import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../../../layouts/BaseLayout";
import { useEffect } from "react";
import AccountForm from "../../auth/components/AccountForm";
import { useStore } from "../../../store/store";

export default function Index() {

    const navigate = useNavigate()
    const { auth } = useStore()

    useEffect( () => {
        if( auth.isAuth ) navigate('/dashboard')
    },[auth.isAuth])

    const location    = useLocation()
    const defaultForm = location.pathname.includes('register') ? 'register' : 'login'

    return (
        <BaseLayout>
            <AccountForm defaultForm={defaultForm} />
        </BaseLayout>
    )
} 