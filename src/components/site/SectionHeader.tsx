import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function SectionHeader({
    title,
    link,
}: {
    title: string;
    link?: { label: string; to?: string };
}) {
    return (
        <motion.div
            initial={{ y: 28, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 40,
                flexWrap: "wrap",
                gap: 16,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 4, height: 36, background: "#8B0000", borderRadius: 2 }} />
                <h2
                    style={{
                        fontFamily: "Syne",
                        fontSize: 36,
                        fontWeight: 700,
                        color: "#1A1A1A",
                    }}
                >
                    {title}
                </h2>
            </div>
            {link && (
                <Link
                    to={link.to || "/"}
                    style={{
                        fontFamily: "Syne",
                        fontSize: 10,
                        fontWeight: 600,
                        color: "#8B0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        paddingBottom: 3,
                        borderBottom: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderBottomColor = "#8B0000";
                        el.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderBottomColor = "transparent";
                        el.style.transform = "translateY(0)";
                    }}
                >
                    {link.label}
                </Link>
            )}
        </motion.div>
    );
}
