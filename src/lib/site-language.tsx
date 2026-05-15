import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

// useLayoutEffect fires synchronously before the browser paints — eliminates
// the EN→TA flash for Tamil users. On the server there is no DOM so we fall
// back to useEffect to avoid React's SSR warning.
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type SiteLanguage = "en" | "ta";

const SITE_LANGUAGE_STORAGE_KEY = "site-language";
const DEFAULT_SITE_LANGUAGE: SiteLanguage = "en";

type SiteLanguageContextValue = {
    language: SiteLanguage;
    setLanguage: (language: SiteLanguage) => void;
    toggleLanguage: () => void;
    isEnglish: boolean;
    isTamil: boolean;
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

function isSiteLanguage(language: string | null): language is SiteLanguage {
    return language === "en" || language === "ta";
}

function readStoredLanguage(): SiteLanguage {
    if (typeof window === "undefined") {
        return DEFAULT_SITE_LANGUAGE;
    }

    const storedLanguage = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    return isSiteLanguage(storedLanguage) ? storedLanguage : DEFAULT_SITE_LANGUAGE;
}

export function SiteLanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<SiteLanguage>(DEFAULT_SITE_LANGUAGE);

    // Read the persisted language synchronously before the first paint so
    // Tamil users never see an English flash. useIsomorphicLayoutEffect is
    // used instead of useEffect to ensure it runs before the browser commits
    // the frame on the client, while falling back safely on the server.
    useIsomorphicLayoutEffect(() => {
        setLanguageState(readStoredLanguage());
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
        document.documentElement.lang = language;
        document.documentElement.dataset.language = language;
    }, [language]);

    const value = useMemo<SiteLanguageContextValue>(
        () => ({
            language,
            setLanguage: setLanguageState,
            toggleLanguage: () => {
                setLanguageState((currentLanguage) =>
                    currentLanguage === "en" ? "ta" : "en",
                );
            },
            isEnglish: language === "en",
            isTamil: language === "ta",
        }),
        [language],
    );

    return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
    const context = useContext(SiteLanguageContext);

    if (!context) {
        throw new Error("useSiteLanguage must be used within a SiteLanguageProvider");
    }

    return context;
}
