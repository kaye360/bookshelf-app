import { CheckIcon, AlertIcon } from "../../../components/common/Icon";
import { UserHandleStatus } from "../hooks/useIsUserHandleAvailable";


export default function UniqueUsernameStatus({
    status, 
    isTouched
} : {
    status : UserHandleStatus
    isTouched : boolean
}) {
    return (
        <div className="grid grid-cols-[1fr_30px] items-center gap-2">
            <span className={`
                    font-medium text-sm rounded-md py-2 px-3 border
                    ${ status === 'available' ? 'text-emerald-500 border-emerald-200 bg-emerald-50' : ''}
                    ${ status === 'unavailable' ? 'text-rose-500 border-rose-200 bg-rose-50' : ''}
                `}
            >
                { status === 'available'  && 'Username is available' }
                { status === 'unavailable' && 'Username is already taken' }
                { status === 'fetching' && 'Checking availability...'}
            </span>
            <div className="relative">
                <CheckIcon 
                    className={`
                        text-emerald-400 stroke-2 absolute left-0 -top-3 transition-all duration-500
                        ${ isTouched ? 'opacity-1' : 'opacity-0'} 
                        ${ status === 'available' ? 'scale-1' : 'scale-0' }
                    `}
                />
                <AlertIcon className={`
                        text-rose-400 stroke-2 absolute left-0 -top-3 transition-all duration-500
                        ${ isTouched ? 'opacity-1' : 'opacity-0'} 
                        ${ status === 'unavailable' ? 'scale-1' : 'scale-0' }
                    `} 
                />
            </div>
        </div>   
    )
}
