import { Mode, Ratings } from "@/typings";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const ModeSchema = z.enum([
    Mode.TRUTH,
    Mode.DARE,
    Mode.TOD,
] as const);

const RatingSchema = z.enum([
    Ratings.PG,
    Ratings.PG13,
    Ratings.R,
] as const).default(Ratings.PG13);

const API_BASE_URL =
    process.env.TRUTH_OR_DARE_API_BASE_URL

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ mode: string }> }
) {
    try {
        const resolvedParams = await params;
        const mode = ModeSchema.parse(resolvedParams.mode.toLowerCase());

        const { searchParams } = new URL(request.url);
        const rawRating = searchParams.get("rating");
        const rating = RatingSchema.parse(rawRating?.toLowerCase());

        const finalMode: "truth" | "dare" =
            mode === Mode.TOD
                ? Math.random() < 0.5
                    ? "truth"
                    : "dare"
                : mode;

        const response = await fetch(
            `${API_BASE_URL}/${finalMode}?rating=${rating}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch from upstream API" },
                { status: 502 }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid mode or rating", issues: error.issues },
                { status: 400 }
            );
        }

        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}