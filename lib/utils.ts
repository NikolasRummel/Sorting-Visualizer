import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const generateRandomArray = (length: number, minValue: number = 10, maxValue: number = 300): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
