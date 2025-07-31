"use client";
import React from "react";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:static lg:shadow-none
            `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Menu
                        </h2>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/assessment"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <span>Assessment</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mintMindwaveToken"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <span>Mint Mindwave Token</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Mindwave v1.0</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
