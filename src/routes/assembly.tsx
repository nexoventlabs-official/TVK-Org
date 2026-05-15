import { createFileRoute } from "@tanstack/react-router";
import { VerticalPage } from "@/components/site/VerticalPage";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/assembly")({
    head: () => ({
        meta: [
            { title: "Assembly Works — Mylapore Constituency · P. Venkataramanan" },
            {
                name: "description",
                content:
                    "Constituency grievances, infrastructure, welfare and development works across Mylapore.",
            },
        ],
    }),
    component: AssemblyPage,
});

function AssemblyPage() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.assembly.title, text.pageMeta.assembly.description);
    const p = text.assemblyPage;
    return (
        <VerticalPage
            variant="assembly"
            color="#1D4ED8"
            eyebrow={p.eyebrow}
            title={p.title}
            paragraphs={p.paragraphs}
            news={p.news.map((n) => ({ date: n.date, title: n.title }))}
        />
    );
}
