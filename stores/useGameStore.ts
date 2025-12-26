import { create } from "zustand";
import { GameState, Mode, Ratings } from "@/typings";

export const useGameStore = create<GameState>()((set) => ({
    mode: Mode.TOD,
    rating: Ratings.PG13,
    currentPlayer: null,
    players: [],

    setMode: (mode) => set({ mode }),

    setRating: (rating) => set({ rating }),

    addPlayer: (player) =>
        set((state) => {
            if (
                player.length < 1 ||
                player.length > 20 ||
                state.players.includes(player)
            ) {
                return state;
            }
            return { players: [player, ...state.players] };
        }),

    removePlayer: (player) =>
        set((state) => ({
            players: state.players.filter((p) => p !== player),
            currentPlayer: state.currentPlayer === player ? null : state.currentPlayer,
        })),

    clearAllPlayers: () =>
        set({
            players: [],
            currentPlayer: null,
        }),

    randomPlayer: () =>
        set((state) => {
            if (state.players.length === 0) {
                return { currentPlayer: null };
            }

            let newPlayer = state.players[Math.floor(Math.random() * state.players.length)];

            if (state.players.length > 1 && newPlayer === state.currentPlayer) {
                const remaining = state.players.filter((p) => p !== state.currentPlayer);
                newPlayer = remaining[Math.floor(Math.random() * remaining.length)];
            }

            return { currentPlayer: newPlayer };
        }),

    resetSettings: () =>
        set({
            mode: Mode.TOD,
            rating: Ratings.PG13,
        }),
}));