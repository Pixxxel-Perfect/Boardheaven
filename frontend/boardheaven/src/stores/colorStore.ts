import { writable } from 'svelte/store';

export const selectedColorStore = writable("");
export const selectedColorIdStore = writable();

export function setSelectedColor(color: string) {
    selectedColorStore.set(color);
}

export function setSelectedColorId(id: number) {
    selectedColorIdStore.set(id);
}
