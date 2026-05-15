import { useEffect } from "react";

/**
 * Updates document.title and the meta description tag reactively.
 * Called inside route components so the browser tab title and
 * description switch immediately when the user toggles language.
 */
export function useDynamicMeta(title: string, description?: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (!description) return;
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "description";
            document.head.appendChild(meta);
        }
        meta.content = description;
    }, [description]);
}
