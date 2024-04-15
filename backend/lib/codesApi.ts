import * as fs from "fs";
import { NodeBuilderFlags } from "typescript";

class GameCodeValidator {
    public static CODE_LENGTH = 5;
    private codes: string[] = [];
    
    constructor() {
        this.loadCodes();
    }
    
    loadCodes() {
        const fileData = fs.readFileSync("lib/codes.txt", "utf-8");
        for (const line of fileData.split("\n")) {
            this.codes.push(line.substring(0, GameCodeValidator.CODE_LENGTH));
        }
    }

    isValid(code: string): boolean {
        if (code.length != GameCodeValidator.CODE_LENGTH) return false;
        return this.codes.includes(code);
    }
}

export { GameCodeValidator };