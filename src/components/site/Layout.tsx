import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
