"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../contexts/WalletContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MintNFT() {
    const router = useRouter();
    const { isWalletConnected } = useWallet();
    const [expertise, setExpertise] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, answer]);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <Navbar onToggleSidebar={handleToggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Mint Mindwave Token
                            </h1>
                            <p className="text-xl text-gray-600">
                                Tokenize your intelligence by minting an NFT
                                based on your expertise assessment
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="max-w-2xl mx-auto">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                                    Mint Your Intelligence NFT
                                </h2>

                                {!isWalletConnected ? (
                                    <div className="text-center py-8">
                                        <div className="text-6xl mb-4">🔐</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Connect Your Wallet First
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Please connect your wallet using the
                                            button in the navigation bar to
                                            continue.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="expertise"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Your Area of Expertise
                                            </label>
                                            <input
                                                type="text"
                                                id="expertise"
                                                value={expertise}
                                                onChange={(e) =>
                                                    setExpertise(e.target.value)
                                                }
                                                placeholder="e.g., Blockchain, Machine Learning, Web Development..."
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-semibold text-blue-900 mb-2">
                                                What to expect:
                                            </h4>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>
                                                    • Complete an expertise
                                                    assessment
                                                </li>
                                                <li>
                                                    • Get your intelligence
                                                    score
                                                </li>
                                                <li>
                                                    • Mint an NFT representing
                                                    your expertise
                                                </li>
                                                <li>
                                                    • Tokenize your knowledge on
                                                    the blockchain
                                                </li>
                                            </ul>
                                        </div>

                                        <button
                                            onClick={async () => {
                                                if (!expertise.trim()) {
                                                    alert(
                                                        "Please enter your area of expertise"
                                                    );
                                                    return;
                                                }
                                                setIsLoading(true);
                                                try {
                                                    // First, generate questions to ensure they're ready
                                                    const response =
                                                        await fetch(
                                                            "/api/generate-questions",
                                                            {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                },
                                                                body: JSON.stringify(
                                                                    {
                                                                        expertise:
                                                                            expertise.trim(),
                                                                    }
                                                                ),
                                                            }
                                                        );

                                                    if (!response.ok) {
                                                        throw new Error(
                                                            "Failed to generate questions"
                                                        );
                                                    }

                                                    // Questions generated successfully, navigate to assessment
                                                    router.push(
                                                        `/assessment?expertise=${encodeURIComponent(
                                                            expertise.trim()
                                                        )}`
                                                    );
                                                } catch (error) {
                                                    console.error(
                                                        "Error preparing assessment:",
                                                        error
                                                    );
                                                    alert(
                                                        "Failed to prepare assessment. Please try again."
                                                    );
                                                    setIsLoading(false);
                                                }
                                            }}
                                            disabled={
                                                isLoading || !expertise.trim()
                                            }
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                        >
                                            {isLoading
                                                ? "Preparing Assessment..."
                                                : "Start Assessment & Mint NFT"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl mb-4">🎯</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Expertise Assessment
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Take a comprehensive assessment to evaluate
                                    your knowledge and skills.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl mb-4">🤖</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    AI Evaluation
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Get instant, accurate scoring and feedback
                                    on your expertise level.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl mb-4">🪙</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Mint NFT
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Tokenize your intelligence by minting a
                                    unique NFT on the blockchain.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MintNFT;
