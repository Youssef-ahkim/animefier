import Link from "next/link";
import { Github, ArrowRight } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30 backdrop-blur-md">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-purple-400 transition-colors">
                Animefier
            </Link>

            <div className="flex items-center gap-4">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                    aria-label="GitHub"
                >
                    <Github className="w-5 h-5" />
                </a>
                <Link
                    href="/animate"
                    className="group flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-50 transition-colors"
                >
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </nav>
    );
}
