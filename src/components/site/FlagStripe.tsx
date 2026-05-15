export function FlagStripe() {
    const Dot = () => (
        <span
            style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                background: "rgba(139,0,0,0.35)",
                display: "inline-block",
            }}
        />
    );
    const Txt = ({ children }: { children: React.ReactNode }) => (
        <span
            style={{
                fontFamily: "Syne",
                fontSize: 8,
                fontWeight: 700,
                color: "#8B0000",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
            }}
        >
            {children}
        </span>
    );
    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: 5, background: "#8B0000" }} />
            <div
                style={{
                    minHeight: 18,
                    background: "#FFCC00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 16,
                    padding: "3px 16px",
                }}
            >
                <Txt>தமிழக வெற்றி கழகம்</Txt>
                <Dot />
                <Txt>Tamilaga Vettri Kazhagam</Txt>
                <Dot />
                <Txt>மக்கள் தொண்டு · People First</Txt>
            </div>
            <div style={{ height: 5, background: "#8B0000" }} />
        </div>
    );
}
