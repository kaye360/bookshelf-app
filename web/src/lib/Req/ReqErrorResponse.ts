import { ReqResponse } from "./Req.type"


export class ReqErrorResponse {

    private static response : ReqResponse = {
        data : null,
        code : 401,
        error : ''
    }

    private static createResponse(error : string) {
        return {...ReqErrorResponse.response, error}
    }

    static invalidToken = ReqErrorResponse.createResponse('Invalid User Token')
}