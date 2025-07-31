"use client";

import React, { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import { useWallet } from "../contexts/WalletContext";

interface NavbarProps {
    onToggleSidebar: () => void;
}

function Navbar({ onToggleSidebar }: NavbarProps) {
    const { setIsWalletConnected } = useWallet();
    const [walletAddress, setWalletAddress] = useState("");

    const handleWalletConnect = (address: string) => {
        setWalletAddress(address);
        setIsWalletConnected(!!address);
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        {/* Hamburger Menu Button */}
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-3"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Mindwave
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ConnectWallet onConnect={handleWalletConnect} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
