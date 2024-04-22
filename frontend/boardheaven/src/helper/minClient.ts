enum MinColor {
    NOT_SET = -1,
    BLACK = 0,
    YELLOW = 1,
    GREEN = 2,
    RED = 3
}

class MinClient {
    constructor(public address: string, public color: MinColor, public isSpectator: boolean) {}
}

export { MinClient, MinColor };