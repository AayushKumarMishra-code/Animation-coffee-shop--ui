"use client";

export default function FooterSection() {
    return (
        <footer className="relative z-10 border-t border-white/5 bg-[#050505] text-white/50 pt-24 sm:pt-32 pb-12 px-6 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 mb-24">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl sm:text-3xl tracking-[0.3em] uppercase font-light mb-6">
                            <span className="text-[#D4A373]">COCO</span>
                            <span className="text-white/60 ml-1.5">Coffee</span>
                        </h3>
                        <p className="max-w-sm font-light leading-relaxed mb-8">
                            Sip the dark side. Cold-brewed obsession, delivered with alarming precision to your door.
                        </p>
                        <div className="flex gap-6">
                            {["Instagram", "Twitter", "Journal"].map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-xs tracking-widest uppercase hover:text-[#D4A373] transition-colors"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white/90 text-sm tracking-[0.2em] uppercase mb-6">Explore</h4>
                        <ul className="space-y-4 font-light text-sm">
                            {["Our Story", "The Process", "Wholesale", "Careers"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-[#D4A373] transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white/90 text-sm tracking-[0.2em] uppercase mb-6">The Inner Circle</h4>
                        <p className="font-light text-sm mb-4">
                            Subscribe for rare drops and chaotic insights.
                        </p>
                        <form className="flex border-b border-white/20 pb-2 focus-within:border-[#D4A373] transition-colors">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent w-full outline-none font-light placeholder:text-white/20"
                            />
                            <button type="submit" className="text-[#D4A373] tracking-wider uppercase text-xs hover:text-white transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-white/30 tracking-widest uppercase">
                    <p>&copy; {new Date().getFullYear()} COCO COFFEE — CRAFTED WITH OBSESSION</p>
                    <p className="mt-4 sm:mt-0">Design by Awwwards Standard</p>
                </div>
            </div>
        </footer>
    );
}
