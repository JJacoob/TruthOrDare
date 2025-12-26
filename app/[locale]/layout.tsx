import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/request";
import { APP_TITLE } from "@/constants";
import type { ReactNode } from "react";
import { Locale } from "@/typings";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale)) notFound();

    const t = await getTranslations({ locale });

    return {
        title: APP_TITLE + ` | ${t("tagline")}`,
        description: t("tagline"),
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale)) notFound();

    const messages = (await import(`@/messages/${locale}.json`)).default;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}