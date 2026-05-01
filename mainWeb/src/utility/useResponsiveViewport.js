import { useEffect, useState } from "react";

export function useResponsiveViewport(query = "(max-width: 767px)") {
    const getMatches = () => {
        if (typeof window === "undefined" || !window.matchMedia) return false;
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handleChange = () => setMatches(mediaQuery.matches);

        handleChange();
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, [query]);

    return matches;
}
