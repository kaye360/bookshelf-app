import { CheckIcon, AlertIcon } from "../../../components/common/Icon";


export default function UniqueUsernameStatus({
    isUserHandleAvailable, 
    isTouched
} : {
    isUserHandleAvailable : boolean
    isTouched : boolean
}) {
    return (
        <div className="grid grid-cols-[1fr_30px] items-center gap-2">
            <span className={`
                    ${ isTouched ? 'font-semibold p-4  rounded-md max-h-16 transition-all' : 'max-h-0' }
                    ${ isUserHandleAvailable ? 'text-emerald-400 bg-emerald-50' : 'text-rose-500 bg-rose-50'}
                `}
            >
                { isTouched && isUserHandleAvailable  && 'Username is available' }
                { isTouched && !isUserHandleAvailable && 'Username is already taken' }
            </span>
            <div className="relative">
                <CheckIcon 
                    className={`
                        text-emerald-400 stroke-2 absolute left-0 -top-3 transition-all duration-500
                        ${ isTouched ? 'opacity-1' : 'opacity-0'} 
                        ${ isUserHandleAvailable ? 'scale-1' : 'scale-0' }
                    `}
                />
                <AlertIcon className={`
                        text-rose-400 stroke-2 absolute left-0 -top-3 transition-all duration-500
                        ${ isTouched ? 'opacity-1' : 'opacity-0'} 
                        ${ isUserHandleAvailable ? 'scale-0' : 'scale-1' }
                    `} 
                />
            </div>
        </div>   
    )
}
