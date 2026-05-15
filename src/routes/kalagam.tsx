import { createFileRoute } from "@tanstack/react-router";
import { VerticalPage } from "@/components/site/VerticalPage";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/kalagam")({
    head: () => ({
        meta: [
            { title: "Kalagam Pani — TVK Party Work · P. Venkataramanan" },
            {
                name: "description",
                content:
                    "Tamilaga Vettri Kazhagam coordination, cadre training, and party programme requests.",
            },
        ],
    }),
    component: KalagamPage,
});

function KalagamPage() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.kalagam.title, text.pageMeta.kalagam.description);
    const p = text.kalagamPage;
    return (
        <VerticalPage
            variant="kalagam"
            color="#8B0000"
            eyebrow={p.eyebrow}
            title={p.title}
            paragraphs={p.paragraphs}
            news={p.news.map((n) => ({ date: n.date, title: n.title }))}
        />
    );
}
