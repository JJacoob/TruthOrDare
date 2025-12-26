"use client";

import { ThemeOptions } from "@/typings";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

interface ThemeToggleProps {
    type: "fab" | "button";
}

const THEME_KEY = "theme";

export const ThemeToggle = ({ type }: ThemeToggleProps) => {
    const [theme, setTheme] = useState<ThemeOptions | null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem(THEME_KEY) as ThemeOptions | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const resolvedTheme =
            storedTheme ?? (prefersDark ? ThemeOptions.DARK : ThemeOptions.LIGHT);

        setTheme(resolvedTheme);
        document.documentElement.dataset.theme = resolvedTheme;
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
            if (!prev) return prev;

            const next =
                prev === ThemeOptions.LIGHT ? ThemeOptions.DARK : ThemeOptions.LIGHT;

            document.documentElement.dataset.theme = next;
            localStorage.setItem(THEME_KEY, next);

            return next;
        });
    }, []);

    if (!theme) return null;

    const Icon =
        theme === ThemeOptions.LIGHT ? MoonIcon : SunIcon;

    const iconSize = type === "button" ? "size-4" : "size-5";

    return type === "button" ? (
        <button
            onClick={toggleTheme}
            className="btn btn-soft btn-primary hidden mobile-theme-toggle"
            aria-label="Toggle theme"
        >
            <Icon className={iconSize} />
        </button>
    ) : (
        <div className="fab desktop-theme-toggle">
            <button
                onClick={toggleTheme}
                className="btn btn-lg btn-circle btn-primary"
                aria-label="Toggle theme"
            >
                <Icon className={iconSize} />
            </button>
        </div>
    );
};
