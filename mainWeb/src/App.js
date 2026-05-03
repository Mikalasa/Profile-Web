import React, { Suspense, useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Navbar from "./component/widgets/Navbar.jsx";
import MobileWarningModal from "./component/modal/MobileWarningModal.jsx";
import DesktopViewportNotice from "./component/modal/DesktopViewportNotice.jsx";
import { AutoScrollContext } from './utility/AutoScrollContext';
import MainLayout from "./component/layout/MainLayout";
import { lockMinViewportHeightVar } from "./utility/lockSmallVh";
import { useResponsiveViewport } from "./utility/useResponsiveViewport";

function App() {
    const [isNavClick, setIsNavClick] = useState(false);
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const useCompactDesktopLayout = useResponsiveViewport("(max-width: 1024px)");
    const showDesktopViewportNotice = !isMobile && !isTablet && useCompactDesktopLayout;

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const shouldWarn = isMobile || isTablet;
        setShowMobileWarning(shouldWarn);
    }, []);

    const dismissMobileWarning = () => {
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
                {showDesktopViewportNotice && <DesktopViewportNotice />}
                <Suspense fallback={<div>Loading...</div>}>
                    <MainLayout />
                </Suspense>
            </div>
        </AutoScrollContext.Provider>
    );
}

export default App;
