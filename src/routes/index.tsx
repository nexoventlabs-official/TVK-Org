import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { FlagStripe } from "@/components/site/FlagStripe";
import { Verticals } from "@/components/site/Verticals";
import { About } from "@/components/site/About";
import { News } from "@/components/site/News";
import { Gallery } from "@/components/site/Gallery";
import { EnquirySection } from "@/components/site/EnquirySection";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "P. Venkataramanan — MLA Mylapore · TVK · School Education Minister" },
            {
                name: "description",
                content:
                    "Official website of P. Venkataramanan, MLA Mylapore, School Education Minister of Tamil Nadu, and TVK Party Treasurer.",
            },
            { property: "og:title", content: "P. Venkataramanan — MLA Mylapore" },
            {
                property: "og:description",
                content: "Service before politics. Mylapore · Tamil Nadu School Education · TVK.",
            },
        ],
    }),
    component: Home,
});

function Home() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.home.title, text.pageMeta.home.description);
    return (
        <Layout>
            <Hero />
            <FlagStripe />
            <Verticals />
            <FlagStripe />
            <About />
            <FlagStripe />
            <News />
            <FlagStripe />
            <Gallery />
            <FlagStripe />
            <EnquirySection />
        </Layout>
    );
}
