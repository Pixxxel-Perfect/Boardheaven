enum RequestType {
    CREATE_ROOM,
    JOIN_ROOM,
    REJOIN_ROOM,
}

class RequestBody {
    public static fromJson(json: string) {
        JSON
    }

    constructor(public reqType: RequestType, public reqData?: string) {}
}

export { RequestBody, RequestType }