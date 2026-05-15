import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";

import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";

export function Navbar() {
    const loc = useLocation();
    const [open, setOpen] = useState(false);
    const { language, toggleLanguage } = useSiteLanguage();
    const content = getSiteContent(language);

    const links = [
        { to: "/", label: content.nav.home },
        { to: "/about", label: content.nav.about },
        { to: "/news", label: content.nav.news },
        { to: "/gallery", label: content.nav.gallery },
        { to: "/kalagam", label: content.nav.kalagam },
        { to: "/assembly", label: content.nav.assembly },
        { to: "/education", label: content.nav.education },
    ] as const;
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "#8B0000",
                borderBottom: "4px solid #FFCC00",
                height: 60,
            }}
        >
            <div
                style={{
                    height: "100%",
                    padding: "0 56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                className="nav-inner"
            >
                <Link to="/" style={{ display: "block" }}>
                    <div
                        style={{
                            fontFamily: "Syne",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "#FFFFFF",
                            lineHeight: 1.1,
                        }}
                    >
                        P. Venkataramanan
                    </div>
                    <div
                        style={{
                            fontFamily: "Syne",
                            fontSize: 8,
                            color: "#FFCC00",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginTop: 2,
                        }}
                    >
                        MLA · Mylapore · TVK
                    </div>
                </Link>
                <nav className="nav-center" style={{ display: "flex", gap: 28 }}>
                    {links.map((l) => {
                        const active = loc.pathname === l.to;
                        return (
                            <Link
                                key={l.to}
                                to={l.to}
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    color: active ? "#FFCC00" : "rgba(255,255,255,0.78)",
                                    transition: "color 0.2s ease, opacity 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!active)
                                        (e.currentTarget as HTMLElement).style.color = "#FFCC00";
                                }}
                                onMouseLeave={(e) => {
                                    if (!active)
                                        (e.currentTarget as HTMLElement).style.color =
                                            "rgba(255,255,255,0.78)";
                                }}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                </nav>
                <button
                    type="button"
                    onClick={toggleLanguage}
                    aria-label={language === "en" ? "Switch to Tamil" : "Switch to English"}
                    className="nav-language"
                    style={{
                        background: "transparent",
                        color: "#FFCC00",
                        border: "1px solid rgba(255,204,0,0.45)",
                        fontFamily: "Syne",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "9px 16px",
                        borderRadius: 2,
                        transition:
                            "background 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "rgba(255,204,0,0.12)";
                        el.style.borderColor = "rgba(255,204,0,0.75)";
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "transparent";
                        el.style.borderColor = "rgba(255,204,0,0.45)";
                    }}
                >
                    {language === "en" ? "TA" : "EN"}
                </button>
                <Link
                    to="/"
                    hash="enquiry"
                    className="nav-cta"
                    style={{
                        background: "#FFCC00",
                        color: "#8B0000",
                        fontFamily: "Syne",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "9px 22px",
                        borderRadius: 2,
                        transition:
                            "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#FFD700")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#FFCC00")
                    }
                >
                    {content.nav.enquiry}
                </Link>
                <button
                    className="nav-burger"
                    aria-label="Menu"
                    onClick={() => setOpen(!open)}
                    style={{
                        display: "none",
                        color: "#FFCC00",
                        fontSize: 20,
                        transition: "transform 0.2s ease, opacity 0.2s ease",
                    }}
                >
                    ☰
                </button>
            </div>
            {open && (
                <div
                    className="nav-drawer"
                    style={{
                        background: "#8B0000",
                        borderTop: "1px solid rgba(255,204,0,0.3)",
                        padding: "12px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                    }}
                >
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            onClick={() => setOpen(false)}
                            style={{
                                color: "rgba(255,255,255,0.85)",
                                fontFamily: "Syne",
                                fontSize: 11,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                transition: "color 0.2s ease, transform 0.2s ease",
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <button
                        type="button"
                        onClick={() => { toggleLanguage(); setOpen(false); }}
                        style={{
                            marginTop: 6,
                            alignSelf: "flex-start",
                            background: "rgba(255,204,0,0.12)",
                            color: "#FFCC00",
                            border: "1px solid rgba(255,204,0,0.45)",
                            fontFamily: "Syne",
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            padding: "9px 20px",
                            borderRadius: 2,
                        }}
                    >
                        {language === "en" ? "தமிழ் / TA" : "English / EN"}
                    </button>
                </div>
            )}
            <style>{`
        @media (max-width: 900px) {
          .nav-inner { padding: 0 20px !important; }
          .nav-center, .nav-language, .nav-cta { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
        </header>
    );
}
