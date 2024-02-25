import { writable } from 'svelte/store';

export const selectedColorStore = writable("");

export function setSelectedColor(color: string) {
    selectedColorStore.set(color);
}
