enum RequestType {
    CREATE_ROOM,
    JOIN_ROOM,
    REJOIN_ROOM,
}

class RequestBody {
    constructor(public reqType: RequestType) {}
}

export { RequestBody, RequestType }