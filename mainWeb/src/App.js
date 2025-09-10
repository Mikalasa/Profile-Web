import React, { Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Navbar from "./component/widgets/Navbar.jsx";
import MobileWarningModal from "./component/modal/MobileWarningModal.jsx";
import { AutoScrollContext } from './utility/AutoScrollContext';
import MainLayout from "./component/layout/MainLayout";


function App() {
    const [isNavClick, setIsNavClick] = useState(false);
    const [showMobileWarning, setShowMobileWarning] = useState(false);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

        if (isMobile) {
            setShowMobileWarning(true);
        }
    }, []);

    return (
        <AutoScrollContext.Provider value={{ isNavClick, setIsNavClick }}>
            <div className="App">
                <Navbar />
                {showMobileWarning && (
                    <MobileWarningModal onClose={() => setShowMobileWarning(false)} />
                )}
                <Suspense fallback={<div>Loading...</div>}>
                    <MainLayout />
                </Suspense>
            </div>
        </AutoScrollContext.Provider>
    );
}

export default App;
