import { locales } from "@/i18n/request";
import { ReactNode } from "react";

export interface ProviderProps {
    children: ReactNode;
}

export enum Mode {
    TRUTH = "truth",
    DARE = "dare",
    TOD = "tod",
}

export enum Ratings {
    PG = "pg",
    PG13 = "pg13",
    R = "r",
}

export interface GameState {
    mode: Mode;
    rating: Ratings;
    currentPlayer: string | null;
    players: string[];

    setMode: (mode: Mode) => void;
    setRating: (rating: Ratings) => void;
    addPlayer: (player: string) => void;
    removePlayer: (player: string) => void;
    clearAllPlayers: () => void;
    randomPlayer: () => void;
    resetSettings: () => void;
}

export type Question = {
  question: string;
  type: "truth" | "dare";
  rating: Ratings;
  translations?: Record<string, string>;
};

export enum ThemeOptions {
    LIGHT = 'party-light',
    DARK = 'party-dark'
}

export type Locale = (typeof locales)[number];