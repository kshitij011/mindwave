"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

// Extend Window interface to include ethereum
declare global {
    interface Window {
        ethereum?: unknown;
    }
}

interface ConnectWalletProps {
    onConnect: (address: string) => void;
}

function ConnectWallet({ onConnect }: ConnectWalletProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const connectWallet = async () => {
        setIsLoading(true);
        try {
            if (typeof window.ethereum !== "undefined" && window.ethereum) {
                const provider = new ethers.BrowserProvider(
                    window.ethereum as ethers.Eip1193Provider
                );
                const accounts = await provider.send("eth_requestAccounts", []);
                const userAddress = accounts[0];

                setAddress(userAddress);
                setIsConnected(true);
                onConnect(userAddress);
            } else {
                alert("Please install MetaMask to use this feature!");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = () => {
        setAddress("");
        setIsConnected(false);
        onConnect("");
    };

    return (
        <div className="flex items-center gap-4">
            {!isConnected ? (
                <button
                    onClick={connectWallet}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    {isLoading ? "Connecting..." : "Connect Wallet"}
                </button>
            ) : (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <button
                        onClick={disconnectWallet}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
}

export default ConnectWallet;
