import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";

export type Variant = "kalagam" | "assembly" | "education";

const cfg: Record<
    Variant,
    {
        color: string;
        hover: string;
        textOnBtn: string;
        bg: string;
        ebColor: string;
    }
> = {
    kalagam: {
        color: "var(--tvk-red)",
        hover: "var(--tvk-red-hover)",
        textOnBtn: "var(--tvk-yellow)",
        bg: "var(--bg-red)",
        ebColor: "var(--tvk-red)",
    },
    assembly: {
        color: "var(--vc-blue)",
        hover: "var(--vc-blue-hover)",
        textOnBtn: "var(--bg)",
        bg: "var(--bg-blue)",
        ebColor: "var(--vc-blue)",
    },
    education: {
        color: "var(--vc-green)",
        hover: "var(--vc-green-hover)",
        textOnBtn: "var(--bg)",
        bg: "var(--bg-green)",
        ebColor: "var(--vc-green)",
    },
};

const Label = ({ children }: { children: React.ReactNode }) => (
    <label
        style={{
            fontFamily: "Syne",
            fontSize: 9,
            fontWeight: 500,
            color: "#6B6B6B",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 5,
            display: "block",
        }}
    >
        {children}
    </label>
);

export function EnquiryForm({ variant, index = 0 }: { variant: Variant; index?: number }) {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    const c = cfg[variant];

    const cardEyebrow =
        variant === "kalagam"
            ? text.kalagamPage.eyebrow
            : variant === "assembly"
              ? text.assemblyPage.eyebrow
              : text.educationPage.eyebrow;

    const cardTitle = text.hero.enquiry.forms[variant === "kalagam" ? "party" : variant];

    const cardSubtitle =
        variant === "kalagam"
            ? text.kalagamPage.formDescription
            : variant === "assembly"
              ? text.assemblyPage.formDescription
              : text.educationPage.formDescription;
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", mobile: "", email: "", request: "" });
    const [touched, setTouched] = useState({ name: false, mobile: false, request: false });
    const [validationTriggered, setValidationTriggered] = useState(false);

    const inputStyle: React.CSSProperties = {
        height: 40,
        background: "var(--bg-off)",
        border: "1px solid var(--border)",
        borderRadius: 2,
        padding: "0 14px",
        fontFamily: "Syne",
        fontSize: 13,
        color: "var(--text)",
        width: "100%",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
    };
    const getFieldStyle = (
        field: "name" | "mobile" | "request",
        baseStyle: React.CSSProperties = inputStyle,
    ) => {
        const hasError = (validationTriggered || touched[field]) && form[field].trim().length === 0;

        return {
            ...baseStyle,
            borderColor: hasError ? "var(--error)" : baseStyle.borderColor,
            boxShadow: hasError ? "0 0 0 4px rgba(217,45,32,0.12)" : baseStyle.boxShadow,
            background: hasError ? "#FFF7F7" : baseStyle.background,
        };
    };
    const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.borderColor = c.color;
        el.style.boxShadow = `0 0 0 4px ${c.color}14`;
        el.style.transform = "translateY(-1px)";
    };
    const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.borderColor = "#E8E0D0";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Map variant to backend category
        const categoryMap: Record<Variant, string> = {
            kalagam: "party",
            assembly: "assembly",
            education: "education",
        };
        
        // Use environment variable for backend URL
        const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        
        try {
            const response = await fetch(`${BACKEND_URL}/api/public/enquiries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: categoryMap[variant],
                    name: form.name,
                    mobile: form.mobile,
                    email: form.email || "",
                    request: form.request,
                }),
            });
            
            const data = await response.json();
            
            if (response.ok && data.ok) {
                setSubmitted(true);
                console.log("✅ Enquiry submitted successfully:", data.id);
            } else if (data.error === "already_submitted") {
                alert(
                    language === "ta"
                        ? "இந்த பிரிவிற்கான கோரிக்கையை நீங்கள் ஏற்கனவே சமர்ப்பித்துள்ளீர்கள். எங்கள் குழு விரைவில் தொடர்பு கொள்ளும்."
                        : "You have already submitted an enquiry for this category. Our team will get back to you shortly.",
                );
            } else {
                alert(
                    language === "ta"
                        ? "கோரிக்கையை சமர்ப்பிக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
                        : "Failed to submit enquiry. Please try again.",
                );
                console.error("Submission error:", data);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert(
                language === "ta"
                    ? "கோரிக்கையை சமர்ப்பிக்க முடியவில்லை. உங்கள் இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்."
                    : "Failed to submit enquiry. Please check your connection and try again.",
            );
        }
    };

    return (
        <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                border: "1px solid var(--border)",
                borderRadius: 3,
                overflow: "hidden",
                background: "var(--bg)",
            }}
        >
            <div style={{ height: 3, background: c.color }} />
            <div style={{ padding: 22, background: c.bg, borderBottom: "1px solid var(--border-light)" }}>
                <div
                    style={{
                        fontFamily: "Syne",
                        fontSize: 8,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: c.ebColor,
                        marginBottom: 5,
                    }}
                >
                    {cardEyebrow}
                </div>
                <div
                    style={{
                        fontFamily: "Syne",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: 3,
                    }}
                >
                    {cardTitle}
                </div>
                <div style={{ fontFamily: "Syne", fontSize: 10, color: "var(--text-muted)" }}>
                    {cardSubtitle}
                </div>
            </div>
            {submitted ? (
                <div style={{ padding: 32, textAlign: "center" }}>
                    <svg
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="var(--success)"
                        strokeWidth="2"
                        style={{ margin: "0 auto" }}
                    >
                        <path d="M5 12l4 4L19 7" />
                    </svg>
                    <div
                        style={{
                            fontFamily: "Syne",
                            fontSize: 13,
                            color: "var(--success)",
                            marginTop: 12,
                        }}
                    >
                        {language === "ta"
                            ? "நன்றி! WhatsApp மூலம் விரைவில் தொடர்பு கொள்ளப்படும்."
                            : "Thank you! We'll be in touch shortly via WhatsApp."}
                    </div>
                </div>
            ) : (
                <form
                    onSubmit={submit}
                    onInvalidCapture={() => setValidationTriggered(true)}
                    style={{
                        padding: 22,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                    }}
                    className="enquiry-form"
                >
                    <div>
                        <Label>
                            {text.hero.enquiry.labels.name} <span style={{ color: "#E63946" }}>*</span>
                        </Label>
                        <input
                            style={getFieldStyle("name")}
                            placeholder={language === "ta" ? "உங்கள் பெயர்" : "Your name"}
                            value={form.name}
                            onChange={(e) => {
                                setForm({ ...form, name: e.target.value });
                                if (!touched.name) setTouched({ ...touched, name: true });
                            }}
                            onBlur={(e) => {
                                setTouched({ ...touched, name: true });
                                onBlur(e);
                            }}
                            onFocus={onFocus}
                            required
                        />
                    </div>
                    <div>
                        <Label>
                            {text.hero.enquiry.labels.mobile} <span style={{ color: "#E63946" }}>*</span>
                        </Label>
                        <input
                            style={getFieldStyle("mobile")}
                            placeholder={language === "ta" ? "10 இலக்க எண்" : "10-digit number"}
                            value={form.mobile}
                            onChange={(e) => {
                                setForm({ ...form, mobile: e.target.value });
                                if (!touched.mobile) setTouched({ ...touched, mobile: true });
                            }}
                            onBlur={(e) => {
                                setTouched({ ...touched, mobile: true });
                                onBlur(e);
                            }}
                            onFocus={onFocus}
                            required
                        />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                        <Label>{text.hero.enquiry.labels.email}</Label>
                        <input
                            type="email"
                            style={inputStyle}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                    </div>
                    <div style={{ gridColumn: "1/-1" }}>
                        <Label>{text.hero.enquiry.labels.request}</Label>
                        <textarea
                            style={{
                                ...getFieldStyle("request", {
                                    ...inputStyle,
                                    height: 88,
                                    padding: 14,
                                    resize: "none",
                                }),
                            }}
                            placeholder={
                                language === "ta"
                                    ? "உங்கள் கோரிக்கையை சுருக்கமாக பதிவு செய்யுங்கள்"
                                    : "Briefly describe your request"
                            }
                            value={form.request}
                            onChange={(e) => {
                                setForm({ ...form, request: e.target.value });
                                if (!touched.request) setTouched({ ...touched, request: true });
                            }}
                            onBlur={(e) => {
                                setTouched({ ...touched, request: true });
                                onBlur(e);
                            }}
                            onFocus={onFocus}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            gridColumn: "1/-1",
                            height: 42,
                            borderRadius: 2,
                            background: c.color,
                            color: c.textOnBtn,
                            fontFamily: "Syne",
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            marginTop: 4,
                            transition: "all 0.2s",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = c.hover;
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 14px 26px rgba(0,0,0,0.11)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = c.color;
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
                        }}
                    >
                        {text.hero.enquiry.labels.submit}
                    </button>
                    <div
                        style={{
                            gridColumn: "1/-1",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            marginTop: -2,
                        }}
                    >
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: 4,
                                background: "var(--whatsapp)",
                                display: "inline-block",
                            }}
                        />
                        <span style={{ fontFamily: "Syne", fontSize: 9, color: "var(--text-muted)" }}>
                            {text.hero.enquiry.labels.note}
                        </span>
                    </div>
                </form>
            )}
            <style>{`
        @media (max-width: 768px) {
          .enquiry-form { grid-template-columns: 1fr !important; padding: 18px !important; }
        }
        @media (max-width: 480px) {
          .enquiry-form { padding: 16px !important; gap: 10px !important; }
        }
      `}</style>
        </motion.div>
    );
}
