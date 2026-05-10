import MochaScrollSequence from "@/components/MochaScrollSequence";
import AboutUs from "@/components/AboutUs";
import Menu from "@/components/Menu";
import Testimonials from "@/components/Testimonials";
import FooterSection from "@/components/FooterSection";

function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl flex items-center justify-between h-16 sm:h-20">
                {/* Brand */}
                <a href="/" className="flex items-center gap-2 group">
                    <span className="text-lg sm:text-xl font-bold tracking-tight">
                        <span className="text-[#D4A373]">COCO</span>
                        <span className="text-white/60 font-light ml-1.5">Coffee</span>
                    </span>
                </a>

                {/* Nav */}
                <nav className="hidden sm:flex items-center gap-8">
                    {["Origin", "Process", "Collection"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-[11px] tracking-[0.25em] uppercase text-white/30 hover:text-[#D4A373]/80 transition-colors duration-500 font-light"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a
                    href="#"
                    className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/90 bg-[#6F4E37] px-5 py-2.5 rounded-full hover:bg-[#8B5E34] transition-all duration-500 font-light"
                >
                    Shop Now
                </a>
            </div>
        </header>
    );
}

export default function Home() {
    return (
        <main className="bg-[#050505] min-h-screen">
            <Header />

            {/* Hero Scroll Sequence */}
            <MochaScrollSequence />

            {/* Additional Sections added sequentially below the scroll animation */}
            <AboutUs />
            <Menu />
            <Testimonials />

            {/* Comprehensive Footer */}
            <FooterSection />
        </main>
    );
}
