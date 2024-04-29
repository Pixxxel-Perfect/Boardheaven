import { writable } from "svelte/store";

export let falseCodeModalShowStore = writable(false); 

export function setFalseCodeModalShowStore(codeFalse: boolean) {
    falseCodeModalShowStore.set(codeFalse);
}