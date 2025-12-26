import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Modal } from "@/components/shared/Modal";

type PlayerForm = { playerName: string };
type PlayersModalProps = {
    players: string[];
    addPlayer: (name: string) => void;
    removePlayer: (name: string) => void;
    randomPlayer: () => void;
};

export const PlayersModal = ({ players, addPlayer, removePlayer, randomPlayer }: PlayersModalProps) => {
    const t = useTranslations();
    const playerForm = useForm<PlayerForm>();
    const prevPlayersRef = useRef<string[]>(players);

    const onAddPlayer = (data: PlayerForm) => {
        const name = data.playerName.trim();
        if (name && name.length <= 20 && !players.includes(name)) {
            addPlayer(name);
            playerForm.reset();
        }
    };

    const handleClose = () => {
        const prevSet = new Set(prevPlayersRef.current);
        const currentSet = new Set(players);
        let changed = prevSet.size !== currentSet.size || [...prevSet].some(p => !currentSet.has(p));
        if (changed) randomPlayer();
        prevPlayersRef.current = [...players];
    };

    return (
        <Modal
            id="players-modal"
            title={t("managePlayers", { n: players.length })}
            onClose={handleClose}
        >
            <form onSubmit={playerForm.handleSubmit(onAddPlayer)} className="flex gap-2 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        autoComplete="off"
                        autoCorrect="off"
                        placeholder="Enter player name (max 20 chars)"
                        className={`input input-bordered w-full ${playerForm.formState.errors.playerName ? "input-error" : ""}`}
                        {...playerForm.register("playerName", {
                            required: true,
                            minLength: 1,
                            maxLength: 20,
                            validate: (value) => !players.includes(value.trim()) || t("playerExists"),
                        })}
                        autoFocus
                    />
                    {playerForm.formState.errors.playerName && (
                        <p className="text-error text-sm mt-1">
                            {playerForm.formState.errors.playerName.type === "maxLength" && t("maxCharacters")}
                            {playerForm.formState.errors.playerName.type === "validate" && t("playerExists")}
                            {playerForm.formState.errors.playerName.type === "required" && t("nameRequired")}
                        </p>
                    )}
                </div>
                <button type="submit" className="btn btn-soft btn-primary">{t("add")}</button>
            </form>

            <div className="max-h-60 overflow-y-auto">
                {players.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">{t("noPlayers")}</p>
                ) : (
                    <ul className="space-y-2">
                        {players.map(player => (
                            <li key={player} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                                <span className="font-body">{player}</span>
                                <button onClick={() => removePlayer(player)} className="btn btn-ghost btn-sm text-error hover:bg-white/10">
                                    <TrashIcon className="size-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Modal>
    );
};
