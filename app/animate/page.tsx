"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, Sparkles, Loader2, Image as ImageIcon, RefreshCcw, ArrowLeft, Download } from "lucide-react";

export default function AnimePage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [animeImage, setAnimeImage] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        // Reset previous results
        setAnimeImage(null);
        setDescription(null);
        setError(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            processFile(file);
        }
    };

    const handleDownload = () => {
        if (!animeImage) return;

        const link = document.createElement("a");
        link.href = animeImage;
        link.download = "anime-masterpiece.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAnimefy = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("/api/animefy", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to animefy image");
            }

            setAnimeImage(data.resultUrl);
            setDescription(data.originalDescription);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 bg-neutral-950 text-white selection:bg-purple-500/30">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Back Button */}
            <div className="absolute top-32 left-4 md:left-8 z-10 mt-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
            </div>

            <main className="relative container mx-auto px-4 py-12 max-w-5xl">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center p-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                        <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                        <span className="text-sm font-medium text-purple-300">AI Powered Transformation</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                        Animefier
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Transform your photos into stunning anime art using Gemini vision and AI generation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Upload Section */}
                    <div className="space-y-6">
                        <div
                            className={`
                relative group cursor-pointer
                border-2 border-dashed rounded-3xl transition-all duration-300 ease-in-out
                ${selectedImage
                                    ? 'border-purple-500/20 bg-neutral-900/50'
                                    : 'border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900/30'
                                }
                h-[400px] flex flex-col items-center justify-center overflow-hidden
              `}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageSelect}
                            />

                            {selectedImage ? (
                                <div className="relative w-full h-full p-4">
                                    <Image
                                        src={selectedImage}
                                        alt="Original"
                                        fill
                                        className="object-contain rounded-2xl"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                        <p className="text-white font-medium flex items-center bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                            <RefreshCcw className="w-4 h-4 mr-2" />
                                            Change Image
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="w-10 h-10 text-neutral-400 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Upload your photo</h3>
                                    <p className="text-neutral-500 max-w-xs mx-auto">
                                        Drag and drop or click to select an image
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAnimefy}
                            disabled={!selectedImage || loading}
                            className={`
                w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wide
                transition-all duration-300 transform active:scale-[0.98]
                flex items-center justify-center
                ${!selectedImage
                                    ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-purple-50 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                                }
              `}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                                    Files are being animefied...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-6 h-6 mr-2" />
                                    Animefy Now
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Result Section */}
                    <div className="space-y-6">
                        <div className={`
              h-[400px] rounded-3xl overflow-hidden relative border border-neutral-800 bg-neutral-900/30
              flex items-center justify-center
              ${animeImage ? 'shadow-[0_0_30px_rgba(168,85,247,0.15)]' : ''}
            `}>
                            {animeImage ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={animeImage}
                                        alt="Anime Version"
                                        fill
                                        className="object-contain"
                                        unoptimized // Necessary for external URLs if not configured in next.config
                                    />
                                </div>
                            ) : loading ? (
                                <div className="text-center space-y-4">
                                    <div className="relative w-24 h-24 mx-auto">
                                        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-pulse" />
                                        <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin" />
                                    </div>
                                    <p className="text-purple-300 font-medium animate-pulse">Generating magic...</p>
                                </div>
                            ) : (
                                <div className="text-center text-neutral-600">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Your anime masterpiece will appear here</p>
                                </div>
                            )}
                        </div>

                        {animeImage && (
                            <button
                                onClick={handleDownload}
                                className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
                            >
                                <Download className="w-5 h-5" />
                                Download Image
                            </button>
                        )}

                        {description && (
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">AI Analysis</h3>
                                <p className="text-neutral-300 leading-relaxed italic">
                                    "{description}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
