import { API_URL } from "../../../config";
import { Req } from "../../../utils/req";
import { Settings } from "../../settings/types/types";


export async function getUserSettings(token : string) : Promise<Settings> {

    const response = await Req.send({
        url : `${API_URL}/settings`,
        token
    })

    if( response.error ) {
        return null
    }

    const settings = JSON.parse( response.data ) as Settings

    return  settings
}