import { writable } from "svelte/store";

// we also need to define a type to store the messages!
/*
export type ChatMessageType = {
    userName: string,
    message: string,
    avatar: string
}
export let chatStore = writable<ChatMessageType[]>([]) 
*/

export let chatStore = writable<string[]>([]) 
