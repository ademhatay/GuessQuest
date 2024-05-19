import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import messages from "./messages.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomMessage = (messageType: keyof typeof messages) => {
  const messagesOfType = messages[messageType];
  const randomIndex = Math.floor(Math.random() * messagesOfType.length);
  return messagesOfType[randomIndex];
};
