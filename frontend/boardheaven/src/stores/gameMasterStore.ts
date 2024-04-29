import { writable } from 'svelte/store';


export const isGameMaster = writable(false);
export const typedInGameCode = writable();

export function setGameMaster(isMaster: boolean, code:string) {
    isGameMaster.set(isMaster);
    typedInGameCode.set(code)
}