import { Mode, Question, Ratings } from "@/typings";

export const fetchTruthOrDare = async (
    mode: Mode,
    rating: Ratings
): Promise<Question> => {
    const res = await fetch(`/api/ask/${mode}?rating=${rating}`);
    if (!res.ok) throw new Error("Failed to fetch question");
    return res.json();
};