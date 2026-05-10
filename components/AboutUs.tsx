"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <section className="relative bg-[#050505] py-32 sm:py-48 px-6 lg:px-16 overflow-hidden border-t border-white/5">
            <div className="mx-auto max-w-4xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-[#D4A373] text-xs sm:text-sm tracking-[0.4em] uppercase font-light mb-8"
                >
                    Our Philosophy
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E8C9A0] leading-tight mb-12"
                >
                    Coffee is not just a drink.<br className="hidden sm:block" />
                    It’s an <span className="italic font-light text-white/80">obsession</span>.
                </motion.h2>
                <div className="space-y-6 text-white/50 font-light text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    >
                        At COCO Coffee, we believe in the dark side of the brew. We source the most exquisite, shade-grown Arabica beans from high-altitude volcanic soils, ensuring every drop carries the profound depth of its origin.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                    >
                        Our cold-brewing process is a slow, methodical ritual—taking exactly 24 hours to extract the rich, chocolatey overtones without any of the bitterness. Served over crystal-clear artisan ice, it’s a chaotic masterpiece in every glass.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
