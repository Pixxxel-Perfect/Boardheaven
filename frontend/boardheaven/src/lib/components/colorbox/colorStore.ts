import { writable } from 'svelte/store';

export const selectedColorStore = writable("");

export function setSelectedColor(color: string) {
    selectedColorStore.set(color);
}

export const selectedColorIdStore = writable<number | null>(null);

export function setSelectedColorId(id: number | null) {
    console.log('Setting selected color ID:', id);

    selectedColorIdStore.set(id);
}
