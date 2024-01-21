import { writable } from 'svelte/store';

export const selectedColor = writable("");

export function setSelectedColor(color: string) {
    selectedColor.set(color);
}