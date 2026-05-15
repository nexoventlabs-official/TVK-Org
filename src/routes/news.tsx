import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { FlagStripe } from "@/components/site/FlagStripe";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/news")({
    head: () => ({
        meta: [
            { title: "News — P. Venkataramanan, MLA Mylapore" },
            {
                name: "description",
                content:
                    "Latest updates from the office of the MLA for Mylapore and the Tamil Nadu School Education Ministry.",
            },
        ],
    }),
    component: NewsPage,
});

const TABS = ["All", "Assembly", "Education", "TVK"] as const;
type Tab = (typeof TABS)[number];

const colorFor = (c: string) =>
    c === "Education" ? "#15803D" : "#8B0000";

function NewsPage() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.news.title, text.pageMeta.news.description);
    const [tab, setTab] = useState<Tab>("All");

    // Combine all news items from site-content across all three pages
    const allItems = [
        ...text.assemblyPage.news,
        ...text.educationPage.news,
        ...text.kalagamPage.news,
    ];

    const filtered =
        tab === "All" ? allItems : allItems.filter((i) => i.category === tab);

    const tabLabel = (t: Tab) => (t === "All" ? text.shared.allTab : t);

    return (
        <Layout>
            <FlagStripe />
            <section style={{ background: "#FFFFFF", padding: "96px 64px" }} className="news-page">
                <SectionHeader title={text.nav.news} />
                <div
                    style={{
                        display: "flex",
                        gap: 4,
                        marginBottom: 32,
                        borderBottom: "1px solid #E8E0D0",
                    }}
                >
                    {TABS.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            style={{
                                padding: "12px 18px",
                                fontFamily: "Syne",
                                fontSize: 10,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                color: tab === t ? "#8B0000" : "#6B6B6B",
                                borderBottom:
                                    tab === t ? "2px solid #8B0000" : "2px solid transparent",
                                marginBottom: -1,
                                transition: "color 0.2s",
                            }}
                        >
                            {tabLabel(t)}
                        </button>
                    ))}
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 1,
                        background: "#E8E0D0",
                    }}
                    className="news-page-grid"
                >
                    {filtered.map((it) => (
                        <article key={it.title} style={{ background: "#FFFFFF", padding: 28 }}>
                            <div
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 9,
                                    fontWeight: 700,
                                    color: colorFor(it.category),
                                    textTransform: "uppercase",
                                    letterSpacing: "0.16em",
                                    marginBottom: 10,
                                }}
                            >
                                {it.category}
                            </div>
                            <h3
                                style={{
                                    fontFamily: "Syne",
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: "#1A1A1A",
                                    lineHeight: 1.5,
                                    marginBottom: 14,
                                }}
                            >
                                {it.title}
                            </h3>
                            <div style={{ fontFamily: "Syne", fontSize: 11, color: "#6B6B6B" }}>
                                {it.date}
                            </div>
                        </article>
                    ))}
                </div>
                <style>{`
        @media (max-width: 1024px) { .news-page-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) { .news-page { padding: 64px 24px !important; } .news-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
            </section>
            <FlagStripe />
        </Layout>
    );
}
