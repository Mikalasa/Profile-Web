import React from "react";

const MobileWarningModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="bg-[#2a2a2a] rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 md:w-1/3">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Notice
                </h2>
                <p className="text-gray-300 mb-6">
                    For the best experience, please visit this site on a desktop.
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition duration-300"
                >
                    Got It
                </button>
            </div>
        </div>
    );
};

export default MobileWarningModal;
