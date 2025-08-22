import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="font-bold text-xl md:hover:scale-[150%] transition-all duration-700">Olivier</a>

        <div className="flex items-center gap-4">
          <a href="#projects" className="md:hover:scale-[70%] transition-all duration-700">Projects</a>
          <a href="#about" className="md:hover:scale-[70%] transition-all duration-700">About</a>
          <a href="#contact" className="md:hover:scale-[70%] transition-all duration-700">Contact</a>
        </div>
      </div>
    </nav>
  );
}
