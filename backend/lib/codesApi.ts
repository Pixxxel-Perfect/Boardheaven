import * as fs from "fs";

class GameCodeValidator {
    public static CODE_LENGTH = 5;
    private codes: string[] = [];
    
    constructor() {
        this.loadCodes();
    }
    
    public isValid(code: string): boolean {
        if (code.length != GameCodeValidator.CODE_LENGTH) return false;
        return this.codes.includes(code);
    }

    private loadCodes() {
        const fileData = fs.readFileSync("lib/codes.txt", "utf-8");
        for (const line of fileData.split("\n")) {
            this.codes.push(line.substring(0, GameCodeValidator.CODE_LENGTH));
        }
    }
}

export { GameCodeValidator };