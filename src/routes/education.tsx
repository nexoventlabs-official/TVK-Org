import { createFileRoute } from "@tanstack/react-router";
import { VerticalPage } from "@/components/site/VerticalPage";
import { useSiteLanguage } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useDynamicMeta } from "@/lib/useDynamicMeta";

export const Route = createFileRoute("/education")({
    head: () => ({
        meta: [
            { title: "School Education — Tamil Nadu · P. Venkataramanan" },
            {
                name: "description",
                content:
                    "School policy, teacher welfare, student outcomes, and reforms across government schools in Tamil Nadu.",
            },
        ],
    }),
    component: EducationPage,
});

function EducationPage() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    useDynamicMeta(text.pageMeta.education.title, text.pageMeta.education.description);
    const p = text.educationPage;
    return (
        <VerticalPage
            variant="education"
            color="#15803D"
            eyebrow={p.eyebrow}
            title={p.title}
            paragraphs={p.paragraphs}
            news={p.news.map((n) => ({ date: n.date, title: n.title }))}
        />
    );
}
