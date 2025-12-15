import Image from "next/image";
import Link from "next/link";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-6xl mx-auto px-4 pt-32 pb-20 text-center">
          <RevealOnScroll>
            <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-float">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-neutral-300">AI-Powered Image Transformation</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 drop-shadow-2xl">
              Turn Your Photos into <br />
              <span className="text-purple-400">Anime Masterpieces</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="max-w-2xl mx-auto text-xl text-neutral-400 mb-12 leading-relaxed">
              Powered by advanced AI. Instant, high-quality anime transformations from any photo.
              Relive your memories in the style of your favorite studios.
              <span className="block mt-2 text-white/60">Try it for free. No credit card required.</span>
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/animate"
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105"
              >
                Start Animating Now
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              </Link>
              <a
                href="#showcase"
                className="px-8 py-4 text-neutral-400 font-medium hover:text-white transition-colors"
              >
                See Examples
              </a>
            </div>
          </RevealOnScroll>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="w-full max-w-7xl mx-auto px-4 py-24">
          <RevealOnScroll>
            <div className="bg-neutral-900/50 rounded-3xl border border-white/10 p-8 md:p-12 backdrop-blur-sm">
              <div className="text-center mb-16">
                <div className="inline-block animate-float">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Magic Happen</h2>
                </div>
                <p className="text-neutral-400">Transform everyday moments into cinematic scenes.</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                {/* Original */}
                <div className="relative group w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform hover:-translate-y-2 duration-500">
                  <Image
                    src="/home1.png"
                    alt="Original Photo"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="px-3 py-1 bg-black/50 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                      Original
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center gap-2 text-purple-400/50">
                  <div className="hidden md:block w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                  <div className="hidden md:block w-32 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                </div>

                {/* Anime Version */}
                <div className="relative group w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] hover:shadow-glow-red transition-all duration-500 hover:-translate-y-2">
                  <Image
                    src="/home2.png"
                    alt="Anime Version"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="px-3 py-1 bg-purple-500/80 border border-purple-400/50 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                      Anime Version
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl mx-auto px-4 py-24 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "Blazing Fast",
                desc: "Get results in seconds. Our optimized hybrid pipeline ensures minimal wait times."
              },
              {
                icon: Sparkles,
                title: "Studio Quality",
                desc: "Generated with advanced diffusion models tuned for high-fidelity anime aesthetics."
              },
              {
                icon: ShieldCheck,
                title: "100% Free",
                desc: "No hidden fees or subscriptions. Experience the power of AI generation completely free."
              }
            ].map((feature, i) => (
              <RevealOnScroll key={i} delay={i * 200}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center mb-6 shadow-xl group hover:animate-float">
                    <feature.icon className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-neutral-950 py-12 text-center text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2024 Animefier. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="https://github.com/Youssef-ahkim/animefier" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
