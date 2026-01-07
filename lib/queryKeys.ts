import { Mode, Ratings } from "@/typings";

export const questionQueryKey = (mode: Mode, rating: Ratings) =>
    ["question", mode, rating] as const;
