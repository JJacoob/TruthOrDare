"use client";

import { getId } from "@/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

type ModalProps = {
    id: string;
    title: string;
    children: ReactNode;
    hadDefaultCloseButton?: boolean;
    onClose?: () => void;
};

export const Modal = ({ id, title, children, hadDefaultCloseButton = true, onClose }: ModalProps) => {
    const t = useTranslations();
    const closeModal = () => {
        const modal = getId(id) as HTMLDialogElement | null;
        modal?.close();
        onClose?.();
    };

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="text-2xl font-heading font-semibold mb-4">{title}</h3>
                <div className="modal-content">{children}</div>

                {hadDefaultCloseButton && (
                    <div className="modal-action mt-6">
                        <button
                            onClick={closeModal}
                            className="btn btn-ghost rounded-lg hover:bg-white/10"
                        >
                            {t("close")}
                        </button>
                    </div>
                )}

            </div>
        </dialog>
    );
};
