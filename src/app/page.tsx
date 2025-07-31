"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useWallet } from "./contexts/WalletContext";

export default function Home() {
    const router = useRouter();
    const { isWalletConnected } = useWallet();
    const [expertise, setExpertise] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleStartAssessment = (e: React.FormEvent) => {
        e.preventDefault();
        if (expertise.trim()) {
            router.push(
                `/assessment?expertise=${encodeURIComponent(expertise.trim())}`
            );
        }
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

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Tokenize Your Intelligence
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Take an assessment in your field of expertise
                                and mint your knowledge as an NFT
                            </p>
                        </div>

                        {/* Assessment Form */}
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                                    Start Your Assessment
                                </h2>

                                <form
                                    onSubmit={handleStartAssessment}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label
                                            htmlFor="expertise"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Your Field of Expertise
                                        </label>
                                        <input
                                            type="text"
                                            id="expertise"
                                            value={expertise}
                                            onChange={(e) =>
                                                setExpertise(e.target.value)
                                            }
                                            placeholder="e.g., React Development, Machine Learning, Digital Marketing..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={
                                            !expertise.trim() || isLoading
                                        }
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                    >
                                        {isLoading
                                            ? "Starting Assessment..."
                                            : "Start Assessment"}
                                    </button>
                                </form>

                                {/* Features */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <svg
                                                className="w-6 h-6 text-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Take Assessment
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Answer questions in your field of
                                            expertise
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <svg
                                                className="w-6 h-6 text-green-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Get Score
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Receive an AI-evaluated expertise
                                            score
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <svg
                                                className="w-6 h-6 text-purple-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            Mint NFT
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Tokenize your expertise as an NFT
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
