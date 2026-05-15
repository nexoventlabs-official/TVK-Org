import { Link } from "@tanstack/react-router";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

const SocialBox = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            width: 30,
            height: 30,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s, transform 0.2s, background-color 0.2s",
        }}
        onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.5)";
            el.style.transform = "translateY(-1px)";
            el.style.backgroundColor = "rgba(255,255,255,0.04)";
        }}
        onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.2)";
            el.style.transform = "translateY(0)";
            el.style.backgroundColor = "transparent";
        }}
    >
        {children}
    </div>
);

const ico = {
    width: 12,
    height: 12,
    stroke: "rgba(255,255,255,0.6)",
    strokeWidth: 1.8,
    fill: "none",
} as const;

export function Footer() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    const flinks = [
        { label: text.nav.home, to: "/" },
        { label: text.nav.about, to: "/about" },
        { label: text.nav.news, to: "/news" },
        { label: text.nav.gallery, to: "/gallery" },
        { label: text.shared.contact, to: "/" },
    ];
    return (
        <footer
            style={{
                background: "linear-gradient(180deg, #8B0000 0%, #6F0000 100%)",
                borderTop: "5px solid #FFCC00",
                padding: "44px 64px 30px",
                position: "relative",
                overflow: "hidden",
            }}
            className="footer-root"
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 10px, transparent 10px, transparent 20px)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at 20% 0%, rgba(255,204,0,0.18), transparent 30%), radial-gradient(circle at 100% 30%, rgba(255,255,255,0.08), transparent 24%)",
                    pointerEvents: "none",
                }}
            />
            <div
                className="footer-row"
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1fr 0.9fr",
                    alignItems: "center",
                    gap: 24,
                    padding: "0 0 28px",
                    borderBottom: "1px solid rgba(255,255,255,0.14)",
                }}
            >
                <div>
                    <div
                        style={{
                            fontFamily: "Syne",
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#FFFFFF",
                            lineHeight: 1.2,
                        }}
                    >
                        P. Venkataramanan
                    </div>
                    <div
                        style={{
                            fontFamily: "Public Sans",
                            fontSize: 8,
                            color: "#FFCC00",
                            textTransform: "uppercase",
                            letterSpacing: "0.16em",
                            opacity: 0.9,
                            marginTop: 5,
                        }}
                    >
                        Official Website · MLA Mylapore
                    </div>
                    <div
                        style={{
                            fontFamily: "Public Sans",
                            fontSize: 12,
                            color: "rgba(255,255,255,0.8)",
                            lineHeight: 1.7,
                            marginTop: 12,
                            maxWidth: 320,
                        }}
                    >
                        {text.shared.footerDesigned}
                    </div>
                </div>
                <div
                    style={{
                        justifySelf: "center",
                        display: "flex",
                        gap: 20,
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {flinks.map((l) => (
                        <Link
                            key={l.label}
                            to={l.to}
                            style={{
                                fontFamily: "Public Sans",
                                fontSize: 9,
                                color: "rgba(255,255,255,0.8)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                transition: "color 0.2s, transform 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "rgba(255,204,0,0.95)";
                                el.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "rgba(255,255,255,0.8)";
                                el.style.transform = "translateY(0)";
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
                <div style={{ justifySelf: "end", display: "flex", gap: 10 }}>
                    <SocialBox>
                        <svg viewBox="0 0 24 24" {...ico}>
                            <path d="M4 4l16 16M20 4L4 20" />
                        </svg>
                    </SocialBox>
                    <SocialBox>
                        <svg viewBox="0 0 24 24" {...ico}>
                            <path d="M14 8h-2c-.6 0-1 .4-1 1v3H8v3h3v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5H17V6h-2c-1.7 0-3 1.3-3 3z" />
                        </svg>
                    </SocialBox>
                    <SocialBox>
                        <svg viewBox="0 0 24 24" {...ico}>
                            <rect x="3" y="3" width="18" height="18" rx="4" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17" cy="7" r="0.6" fill="currentColor" />
                        </svg>
                    </SocialBox>
                </div>
            </div>
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                    alignItems: "center",
                    paddingTop: 18,
                    fontFamily: "Public Sans",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.62)",
                }}
            >
                <div>{text.shared.footerRights}</div>
                <div>{text.shared.footerBottom}</div>
            </div>
            <style>{`
        @media (max-width: 768px) {
          .footer-root { padding: 28px 20px 22px !important; }
          .footer-row { grid-template-columns: 1fr !important; text-align: center; gap: 14px !important; padding-bottom: 18px !important; }
          .footer-row > div { max-width: 100% !important; }
          .footer-row > div:last-child { justify-content: center !important; }
          .footer-row > div { justify-self: center !important; }
          .footer-row + div { text-align: center; justify-content: center; }
          .footer-row + div { padding-top: 14px !important; }
        }
      `}</style>
        </footer>
    );
}
