import { useState, SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { UserBook } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { useUserBooks } from "./getUserBooks"
import { useStore } from "../../../store/store"
import { Req } from "../../../lib/Req/Req"
import { ReqResponse } from "../../../lib/Req/Req.type"
import { useQuery } from "@tanstack/react-query"



interface DeleteBookProps {
    book  : UserBook, 
    token : string|null
}


export function useDeleteUserBook(props : DeleteBookProps) {

    return useQuery({
        queryKey : ['deleteBook'],
        queryFn : () => deleteBook({...props}),
        initialData : null,
        enabled : false
    })
}


async function deleteBook({token, book} : DeleteBookProps) : Promise<ReqResponse> {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response  = await Req.delete({ url: `${API_URL}/book/${book.id}`, token })
    return response
}