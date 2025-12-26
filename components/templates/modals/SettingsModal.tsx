import { getId } from "@/utils";
import { Mode, Ratings } from "@/typings";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/constants";
import { Modal } from "@/components/shared/Modal";

type SettingsModalProps = {
    mode: Mode;
    rating: Ratings;
    setMode: (mode: Mode) => void;
    setRating: (rating: Ratings) => void;
    resetSettings: () => void;
};

export const SettingsModal = ({ mode, rating, setMode, setRating, resetSettings }: SettingsModalProps) => {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocaleCode: string) => {
        const segments = pathname.split("/").slice(2);
        router.push(`/${newLocaleCode}/${segments.join("/")}`);
        closeModal();
    };

    const closeModal = () => {
        const modal = getId("settings-modal") as HTMLDialogElement | null;
        modal?.close();
    };

    return (
        <Modal id="settings-modal" title={t("gameSettings")} hadDefaultCloseButton={false}>
            <div className="space-y-8">
                <div>
                    <label className="label"><span className="label-text font-body mb-2">{t("language")}</span></label>
                    <select className="select select-neutral w-full" value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
                        {LOCALES.map(loc => <option key={loc.code} value={loc.code}>{loc.name}</option>)}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="label"><span className="label-text font-body mb-4">{t("gameMode")}</span></label>
                    <div className="space-y-3">
                        {Object.values(Mode).map(m => (
                            <label key={m} className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="mode" checked={mode === m} className="radio radio-primary radio-sm" onChange={() => setMode(m)} />
                                <span className="capitalize">{m}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <label className="label"><span className="label-text font-body mb-4">{t("contentRating")}</span></label>
                    <div className="space-y-3">
                        {Object.values(Ratings).map(r => (
                            <label key={r} className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="rating" checked={rating === r} className="radio radio-primary radio-sm" onChange={() => setRating(r)} />
                                <span className="uppercase">{r}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <button type="button" onClick={resetSettings} className="btn btn-outline btn-error rounded-lg">{t("resetDefault")}</button>
                    <button onClick={closeModal} className="btn btn-ghost rounded-lg hover:bg-white/10">{t("close")}</button>
                </div>
            </div>
        </Modal>
    );
};
