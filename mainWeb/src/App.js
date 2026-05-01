import React, { Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Navbar from "./component/widgets/Navbar.jsx";
import MobileWarningModal from "./component/modal/MobileWarningModal.jsx";
import { AutoScrollContext } from './utility/AutoScrollContext';
import MainLayout from "./component/layout/MainLayout";
import { lockMinViewportHeightVar } from "./utility/lockSmallVh";
import { useResponsiveViewport } from "./utility/useResponsiveViewport";

const MOBILE_WARNING_DISMISSED_KEY = "profile-web-mobile-warning-dismissed";

function App() {
    const [isNavClick, setIsNavClick] = useState(false);
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const isNarrowViewport = useResponsiveViewport();

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const warningDismissed = window.localStorage.getItem(MOBILE_WARNING_DISMISSED_KEY) === "true";
        if ((isMobile || isNarrowViewport) && !warningDismissed) {
            setShowMobileWarning(true);
        }
    }, [isNarrowViewport]);

    const dismissMobileWarning = () => {
        window.localStorage.setItem(MOBILE_WARNING_DISMISSED_KEY, "true");
        setShowMobileWarning(false);
    };

    useEffect(() => {
        const cleanup = lockMinViewportHeightVar("--app-svh");
        return cleanup;
    }, []);

    return (
        <AutoScrollContext.Provider value={{ isNavClick, setIsNavClick }}>
            <div className="App">
                <Navbar />
                {showMobileWarning && (
                    <MobileWarningModal onClose={dismissMobileWarning} />
                )}
                <Suspense fallback={<div>Loading...</div>}>
                    <MainLayout />
                </Suspense>
            </div>
        </AutoScrollContext.Provider>
    );
}

export default App;
