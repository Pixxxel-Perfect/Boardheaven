import { Color } from "./client";
import { GamePiece } from "./gamePiece";
import { MinGamePiece } from "./min/minGamePiece";
import { Room } from "./room";

class GameState {
    public pieces: GamePiece[] = [];
    public currentPlayerColor: Color;
    public diceThrow: number;
    
    private room: Room;
    private activeColors: Color[];
    
    constructor(room: Room) {
        this.room = room;
        this.activeColors = this.room.getActiveColors();
        this.currentPlayerColor = this.activeColors[0];
        this.diceThrow = rollDice();

        this.activeColors.forEach(c => {
            for (let i = 1; i <= 4; i++) {
                this.pieces.push(new GamePiece(c, -(4 * c + i)));
            }
        });
        return;
    }

    //the return type gives the info if an update occoured (broadcastGameState needs to be called or not)
    public makeMoveWithPiece(minPiece: MinGamePiece): boolean {
        let piece = this.pieces.find(p => p.pos == minPiece.pos);
        if (!piece) return false;
        
        if (piece.color !== this.currentPlayerColor) return false;

        //TODO: make it so that a player does not have to choose a figure when softlocked
        // VVV Maybe remove this when adding the bottom part
        if (this.isCurrentPlayerSoftlocked()) {
            this.switchToNextPlayer();
            this.diceThrow = rollDice();
            return true;
        }

        if (!this.movePiece(piece)) return false;
        
        if (this.shouldEnd()) {
            this.room.finishGame();
            return false;
        }

        this.switchToNextPlayer();
        this.diceThrow = rollDice();
        return true;

        // VVV Thats a suprise tool that will help us later VVV
        /*for (let failSafeTries = 100; failSafeTries > 0; failSafeTries--) {
            if (!this.isCurrentPlayerSoftlocked()) return true;
            this.switchToNextPlayer();
            this.diceThrow = rollDice();
        }

        // VVV This should never happen
        console.log("Softlock failsafe failed, we're all doomed!");
        return false;*/
    }

    // Position is a number ranging from -16 to -1 for the starting house
    // 0 to 39 for on the board
    // and add 100 for being in the end house
    private movePiece(piece: GamePiece): Boolean {
        if (piece.pos >= 100) {
            let newPos = piece.pos + this.diceThrow;

            if (newPos % 10 > 3) return false;
            if (this.getPieceAt(newPos)) return false;
            
            piece.pos = newPos;
            return true;
        }

        // Test if piece can be initialized on the board
        if (piece.pos < 0) {
            const isSix = this.diceThrow == 6;
            if (isSix) {
                const possColPiece = this.getPieceAt(piece.initPos);
                if (possColPiece) {
                    if (possColPiece.color == piece.color) return false;
                    possColPiece.capture();
                }
                piece.init();
            }
            return isSix;
        }

        let newPos = (piece.pos + this.diceThrow) % 40;
        let housePos = (39 + piece.initPos) % 40;

        if (piece.pos + this.diceThrow > housePos && piece.pos <= housePos) {
            if (newPos % 10 > 3) return false;
            newPos += 100;
            const possColPiece = this.getPieceAt(newPos);
            if (possColPiece) return false;

            piece.pos = newPos;
            return true;
        }

        //Test if new position is valid
        const possColPiece = this.getPieceAt(newPos);
        if (possColPiece) {
            if (possColPiece.color == piece.color) return false;
            possColPiece.capture();
        }
        
        piece.pos = newPos;
        return true;
    }

    private switchToNextPlayer(): void {
        if (this.diceThrow == 6) return;

        let index = this.activeColors.indexOf(this.currentPlayerColor);
        if (index < 0) console.error("The current Player is not marked as active.");

        do {
            index += 1
            index %= this.activeColors.length;
        } while (this.isPlayerFinished(this.currentPlayerColor));

        this.currentPlayerColor = this.activeColors[index];
    }

    private isPlayerFinished(color: Color): boolean {
        let pieces = this.getPiecesOfColor(color);
        return pieces.every(p => p.pos >= 100);
    }

    private shouldEnd(): boolean {
        return this.room.getActiveColors().every(c => this.isPlayerFinished(c));
    }

    private getPieceAt(pos: number): GamePiece | null {
        return this.pieces.find(p => p.pos == pos) ?? null;
    }

    private getPiecesOfColor(color: Color): GamePiece[] {
        return this.pieces.filter(p => p.color == color);
    }

    private isCurrentPlayerSoftlocked(): boolean {
        const pieces = this.getPiecesOfColor(this.currentPlayerColor);

        for (let i = 0; i < pieces.length; i++) {
            const lastPos = pieces[i].pos;
            if (this.movePiece(pieces[i])) {
                pieces[i].pos = lastPos;
                return false;
            }
        }
        
        return true;
    }
}

function rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
}

export { GameState, rollDice };