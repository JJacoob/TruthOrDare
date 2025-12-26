import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function addStyles(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getId(input: string) {
  return document.getElementById(input);
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
