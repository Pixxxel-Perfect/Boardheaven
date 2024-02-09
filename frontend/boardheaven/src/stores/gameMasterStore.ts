import { writable } from 'svelte/store';


export const isGameMaster = writable(false);

export function setGameMaster(isMaster: boolean) {
    isGameMaster.set(isMaster);
}