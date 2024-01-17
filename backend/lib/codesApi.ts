import * as fs from "fs";

class GameCodeValidator {

    private codes: string[] = [];
    
    constructor() {
        this.loadCodes();
    }
    
    loadCodes() {
        const fileData = fs.readFileSync("codes.txt", "utf-8");
        for (const line of fileData.split("\n")) {
            this.codes.push(line);
        }
    }

    isValid(code: string): boolean {
        if (code.length != 5) return false;
        return this.codes.includes(code);
    }
}

export { GameCodeValidator };