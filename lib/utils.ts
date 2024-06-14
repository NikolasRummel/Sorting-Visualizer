import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const generateRandomArray = (length: number, minValue: number = 10, maxValue: number = 300): number[] => {
    return Array.from({length}, () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
};

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

let audioCtx: AudioContext | null = null;

export function playNote(freq: number) {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    const duration = 0.1;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.frequency.value = freq;
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);

    gainNode.gain.value = 0.1;
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}
