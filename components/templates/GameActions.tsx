"use client";

import { Cog8ToothIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Badges, Orientation } from "../shared/Badges";
import { useGameStore } from "@/stores/useGameStore";
import { useShallow } from "zustand/react/shallow";
import { Mode } from "@/typings";
import { getId } from "@/utils";
import { PlayersModal } from "./modals/PlayerModal";
import { SettingsModal } from "./modals/SettingsModal";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { APP_TITLE } from "@/constants";
import { ThemeToggle } from "./buttons/ThemeToggle";

export const GameActions = () => {
    const t = useTranslations();

    const {
        mode,
        rating,
        players,
        addPlayer,
        removePlayer,
        setMode,
        setRating,
        resetSettings,
        randomPlayer,
    } = useGameStore(
        useShallow((state) => ({
            mode: state.mode,
            rating: state.rating,
            players: state.players,
            addPlayer: state.addPlayer,
            removePlayer: state.removePlayer,
            setMode: state.setMode,
            setRating: state.setRating,
            resetSettings: state.resetSettings,
            randomPlayer: state.randomPlayer,
        }))
    );

    const openModal = useCallback((id: string) => {
        const modal = getId(id) as HTMLDialogElement | null;
        modal?.showModal();
    }, []);

    const badgeValues = useMemo(
        () => [
            mode === Mode.TOD
                ? "Random"
                : `${mode.charAt(0).toUpperCase()}${mode.slice(1)}`,
            rating.toUpperCase(),
        ],
        [mode, rating]
    );

    return (
        <>
            <header className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                    <h1 className="mb-2 text-3xl md:text-4xl font-heading font-semibold text-center md:text-left">
                        {APP_TITLE}
                    </h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() => openModal("players-modal")}
                            className="btn btn-soft btn-primary flex items-center gap-2"
                        >
                            <UserPlusIcon className="size-4 shrink-0" />
                            <span className="hidden md:inline">{t("players")}</span>
                            <span>({players.length})</span>
                        </button>

                        <button
                            onClick={() => openModal("settings-modal")}
                            className="btn btn-soft btn-primary"
                            aria-label="Settings"
                        >
                            <Cog8ToothIcon className="size-4" />
                        </button>

                        <ThemeToggle type="button" />
                    </div>
                </div>

                <Badges
                    values={badgeValues}
                    orientation={Orientation.ROW}
                />
            </header>

            <PlayersModal
                players={players}
                addPlayer={addPlayer}
                removePlayer={removePlayer}
                randomPlayer={randomPlayer}
            />

            <SettingsModal
                mode={mode}
                rating={rating}
                setMode={setMode}
                setRating={setRating}
                resetSettings={resetSettings}
            />
        </>
    );
};
