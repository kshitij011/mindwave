/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWallet } from "../contexts/WalletContext";
import { CONTRACT_CONFIG } from "../../config/contract";

interface Question {
    id: number;
    text: string;
}

interface AssessmentData {
    questions: Question[];
    answers: string[];
    expertise: string;
}

export default function AssessmentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isWalletConnected } = useWallet();
    const expertise = searchParams.get("expertise") || "";

    const [assessmentData, setAssessmentData] = useState<AssessmentData>({
        questions: [],
        answers: Array(5).fill(""),
        expertise: expertise,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (!expertise) {
            router.push("/");
            return;
        }
        generateQuestions();
    }, [expertise, router]);

    const generateQuestions = async () => {
        try {
            const response = await fetch("/api/generate-questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ expertise }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate questions");
            }

            const data = await response.json();
            setAssessmentData((prev) => ({
                ...prev,
                questions: data.questions,
            }));
        } catch (error) {
            console.error("Error generating questions:", error);
            alert("Failed to generate questions. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (index: number, value: string) => {
        setAssessmentData((prev) => ({
            ...prev,
            answers: prev.answers.map((answer, i) =>
                i === index ? value : answer
            ),
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/evaluate-assessment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questions: assessmentData.questions,
                    answers: assessmentData.answers,
                    expertise: assessmentData.expertise,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to evaluate assessment");
            }

            const data = await response.json();
            setScore(data.score);
            setShowResults(true);
        } catch (error) {
            console.error("Error evaluating assessment:", error);
            alert("Failed to evaluate assessment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMintMindwaveToken = async () => {
        if (!isWalletConnected) {
            alert("Please connect your wallet first to mint an NFT.");
            return;
        }

        setIsMinting(true);
        try {
            // Check if we're in the browser
            if (typeof window === "undefined") {
                alert("This function can only be called in the browser.");
                return;
            }

            // Check if MetaMask is installed
            if (typeof window.ethereum === "undefined") {
                alert(
                    "MetaMask is not installed. Please install MetaMask to mint NFTs."
                );
                return;
            }

            // Dynamically import ethers to avoid SSR issues
            const { ethers } = await import("ethers");

            // Connect to the provider
            const provider = new ethers.BrowserProvider(
                window.ethereum as unknown
            );

            // Get the signer
            const signer = await provider.getSigner();

            // Create contract instance
            const contract = new ethers.Contract(
                CONTRACT_CONFIG.ADDRESS,
                CONTRACT_CONFIG.ABI,
                signer
            );

            // Call the mintMindwaveToken function
            const tx = await contract.mintMindwaveToken(
                assessmentData.expertise,
                score!
            );

            // Wait for transaction to be mined
            const receipt = await tx.wait();

            alert(`NFT minted successfully! Transaction hash: ${receipt.hash}`);

            // Navigate back to mint page
            router.push("/mintMindwaveToken");
        } catch (error) {
            console.error("Error minting NFT:", error);
            alert("Failed to mint NFT. Please try again.");
        } finally {
            setIsMinting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Generating questions...
                    </p>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Assessment Results
                        </h1>

                        <div className="text-center mb-8">
                            <div className="text-6xl font-bold text-blue-600 mb-4">
                                {score}/100
                            </div>
                            <div className="text-xl text-gray-600 mb-4">
                                Your expertise score in{" "}
                                {assessmentData.expertise}
                            </div>
                            <div
                                className={`text-lg font-semibold ${
                                    score! >= 75
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {score! >= 75
                                    ? "You are an expert in this field!"
                                    : "You need more experience in this field."}
                            </div>

                            {/* Wallet Connection Status */}
                            <div className="mt-4">
                                <div
                                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                                        isWalletConnected
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full mr-2 ${
                                            isWalletConnected
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    ></div>
                                    {isWalletConnected
                                        ? "Wallet Connected"
                                        : "Wallet Not Connected"}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => router.push("/")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Take Another Assessment
                            </button>
                            <button
                                onClick={handleMintMindwaveToken}
                                disabled={!isWalletConnected || isMinting}
                                className={`font-medium py-3 px-6 rounded-lg transition-colors duration-200 ${
                                    isWalletConnected && !isMinting
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-400 text-gray-600 cursor-not-allowed"
                                }`}
                            >
                                {isMinting
                                    ? "Minting NFT..."
                                    : isWalletConnected
                                    ? "Mint NFT"
                                    : "Connect Wallet to Mint"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Expertise Assessment
                    </h1>
                    <p className="text-gray-600 text-center mb-4">
                        Testing your knowledge in:{" "}
                        <span className="font-semibold">{expertise}</span>
                    </p>
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                            <span className="text-sm font-medium">
                                {
                                    assessmentData.answers.filter((answer) =>
                                        answer.trim()
                                    ).length
                                }{" "}
                                of {assessmentData.questions.length} questions
                                answered
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {assessmentData.questions.map((question, index) => (
                            <div
                                key={question.id}
                                className="border border-gray-200 rounded-lg p-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Question {index + 1}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {question.text}
                                </p>
                                <textarea
                                    value={assessmentData.answers[index]}
                                    onChange={(e) =>
                                        handleAnswerChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter your answer here..."
                                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleSubmit}
                            disabled={
                                isSubmitting ||
                                assessmentData.answers.some(
                                    (answer) => !answer.trim()
                                )
                            }
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-4 px-12 rounded-lg transition-colors duration-200 text-lg font-semibold"
                        >
                            {isSubmitting
                                ? "Evaluating Assessment..."
                                : "Submit Assessment & Get Score"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
