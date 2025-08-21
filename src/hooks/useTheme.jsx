// src/components/Navbar.jsx
import ThemeToggle from "../components/ThemeToggle";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="font-bold text-xl">Portfolio</h1>

                <div className="flex items-center gap-4">
                    <a href="#projects">Projects</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>

                    {/* Theme toggle button */}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
