import { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import GuestForm from "./GuestForm"
import { useAuth } from "../../lib/auth/AuthProvider"
import { useLocation } from "react-router-dom"

type Form = 'login' | 'register' | 'guest'

export default function LoginOrRegisterForm({defaultForm = 'login'} : { defaultForm? : Form}) {

    const { isAuth } = useAuth()
    if( isAuth ) return <></>

    const [form, setForm] = useState<Form>(defaultForm)

    const location = useLocation()
    useEffect( () => {
        setForm(defaultForm)
    }, [location.pathname])

    const translateX : { [key in Form] : string } = {
        login    : '0%',
        register : '33.3%',
        guest    : '66.6%'
    }

    return (
        <div className="w-full max-w-xl mx-auto px-4 py-12">

            <div className="flex justify-center gap-12 mb-12 text-xl">

                <button 
                    onClick={ () => setForm('login')}
                    className={`border-b-2 px-2 min-w-max  ${form === 'login' ? ' border-primary-light' : 'border-transparent'} `}
                >
                    Log In 
                </button>

                <button 
                    onClick={ () => setForm('register')}
                    className={`border-b-2 px-2 min-w-max ${form === 'register' ? ' border-primary-light' : 'border-transparent'} `}
                >
                    Register
                </button>

                <button 
                    onClick={ () => setForm('guest')}
                    className={`border-b-2 px-2 min-w-max ${form === 'guest' ? ' border-primary-light' : 'border-transparent'} `}
                >
                    Guest
                </button>

            </div>

            <div className="overflow-hidden">
                <div 
                    className={`grid grid-cols-3 gap-0 w-[300%] transition-transform duration-200`}
                    style={{ transform : `translateX(-${translateX[form]})` }}
                >
                    <LoginForm />
                    <RegisterForm />
                    <GuestForm />
                </div>
            </div>


        </div>
    )
}
