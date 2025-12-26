"use client";

import { useQuery } from "@tanstack/react-query";
import { useGameStore } from "@/stores/useGameStore";
import { Mode, Question, Ratings } from "@/typings";
import { Skeleton } from "../shared/Skeleton";
import { useShallow } from "zustand/shallow";
import { ArrowPathIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { debounce } from "@/utils";
import { DEBOUNCE_MS } from "@/constants";
import { useLocale, useTranslations } from "next-intl";
import { fetchTruthOrDare } from "@/app/actions";

export const GamePrompt = () => {
    const t = useTranslations();
    const locale = useLocale();

    const {
        mode,
        rating,
        currentPlayer,
        randomPlayer,
        players,
    } = useGameStore(
        useShallow((state) => ({
            mode: state.mode,
            rating: state.rating,
            currentPlayer: state.currentPlayer,
            randomPlayer: state.randomPlayer,
            players: state.players,
        }))
    );

    const {
        data: question,
        isLoading,
        isFetching,
        refetch,
    } = useQuery<Question>({
        queryKey: ["question", mode, rating, currentPlayer],
        queryFn: () => fetchTruthOrDare(mode, rating),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const refetchQuestion = useMemo(
        () =>
            debounce(() => {
                if (!isFetching) refetch();
            }, DEBOUNCE_MS),
        [refetch, isFetching]
    );

    const nextPlayer = useMemo(
        () => debounce(() => randomPlayer(), DEBOUNCE_MS),
        [randomPlayer]
    );

    const isInitialLoading = isLoading && !question;
    const displayName = currentPlayer ? t('turn', { player: currentPlayer }) : "";

    const displayQuestion =
        locale !== "en" && question?.translations?.[locale]
            ? question.translations[locale]
            : question?.question;

    return (
        <>
            <h2 className="text-4xl font-bold font-body text-center mb-6 mt-10">
                {displayName}
            </h2>

            <main className="flex flex-1 items-center justify-center pb-36">
                <div className="w-full max-w-2xl mx-auto text-center min-h-40">
                    {isInitialLoading ? (
                        <div className="flex flex-col gap-3 items-center">
                            <Skeleton className="w-[80%] h-8" />
                            <Skeleton className="w-full h-8" />
                            <Skeleton className="w-[70%] h-8" />
                        </div>
                    ) : (
                        <p className="font-body text-3xl leading-relaxed font-semibold">
                            {displayQuestion || t("pressReroll")}
                        </p>
                    )}
                </div>
            </main>

            <footer className="sticky bottom-0 z-20 bg-base-100 pb-safe">
                <div className="flex flex-col gap-4 w-full max-w-md mx-auto max-[678px]:max-w-none">
                    {mode === Mode.TOD && question && (
                        <button
                            onClick={refetchQuestion}
                            disabled={isFetching}
                            className="btn btn-primary w-full"
                        >
                            {question.type.toLowerCase() === "truth"
                                ? t("wantDare")
                                : t("wantTruth")}
                        </button>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={refetchQuestion}
                            disabled={isFetching}
                            className="flex-1 btn btn-soft btn-primary"
                        >
                            <ArrowPathIcon className="size-4" />
                            {isFetching ? t("loading") : t("reroll")}
                        </button>

                        {players.length > 1 && (
                            <button
                                onClick={nextPlayer}
                                className="flex-1 btn btn-soft btn-primary"
                            >
                                <UsersIcon className="size-4" />
                                {t("nextPlayer")}
                            </button>
                        )}
                    </div>
                </div>
            </footer>
        </>
    );
};
