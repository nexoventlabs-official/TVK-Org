import { SectionHeader } from "./SectionHeader";
import { EnquiryForm } from "./EnquiryForm";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

export function EnquirySection() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    return (
        <section
            id="enquiry"
            style={{ background: "#FFFFFF", padding: "clamp(72px, 8vw, 96px) 64px" }}
            className="enquiry-root"
        >
            <SectionHeader title={text.hero.enquiry.heading} />
            <p
                style={{
                    fontFamily: "Syne",
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.75,
                    maxWidth: 520,
                    marginBottom: 48,
                }}
            >
                {text.hero.enquiry.description}
            </p>
            <div
                className="enquiry-grid"
                style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
            >
                <EnquiryForm variant="kalagam" index={0} />
                <EnquiryForm variant="assembly" index={1} />
                <EnquiryForm variant="education" index={2} />
            </div>
            <style>{`
        @media (max-width: 1024px) { .enquiry-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) { .enquiry-root { padding: 64px 24px !important; } .enquiry-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </section>
    );
}
