import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    Outlet,
    Link,
    createRootRouteWithContext,
    useRouter,
    HeadContent,
    Scripts,
} from "@tanstack/react-router";

import { SiteLanguageProvider } from "@/lib/site-language";
import { getSiteContent } from "@/lib/site-content";
import { useSiteLanguage } from "@/lib/site-language";
import appCss from "../styles.css?url";

function NotFoundComponent() {
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <h1 className="text-7xl font-bold text-foreground">404</h1>
                <h2 className="mt-4 text-xl font-semibold text-foreground">{text.shared.notFoundTitle}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{text.shared.notFoundBody}</p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        {text.shared.notFoundCta}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
    console.error(error);
    const router = useRouter();
    const { language } = useSiteLanguage();
    const text = getSiteContent(language);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    {text.shared.errorTitle}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">{text.shared.errorBody}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => {
                            router.invalidate();
                            reset();
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        {text.shared.tryAgain}
                    </button>
                    <a
                        href="/"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                        {text.shared.goHome}
                    </a>
                </div>
            </div>
        </div>
    );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "P. Venkataramanan — MLA Mylapore · TVK" },
            {
                name: "description",
                content:
                    "Official website of P. Venkataramanan — MLA Mylapore, School Education Minister Tamil Nadu, and TVK Party Treasurer.",
            },
            { name: "author", content: "Office of P. Venkataramanan" },
            { property: "og:title", content: "P. Venkataramanan — MLA Mylapore · TVK" },
            {
                property: "og:description",
                content: "MLA Mylapore · School Education Minister · TVK Party Treasurer.",
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:site", content: "@Lovable" },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}

function RootComponent() {
    const { queryClient } = Route.useRouteContext();

    return (
        <SiteLanguageProvider>
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </SiteLanguageProvider>
    );
}
