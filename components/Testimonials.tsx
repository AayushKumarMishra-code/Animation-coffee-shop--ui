"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const REVIEWS = [
    { text: "The Mocha Noir utterly ruined regular coffee for me. It's a revelation.", author: "James T." },
    { text: "It's not just a drink, it's an aesthetic experience. The cold brew is impossibly smooth.", author: "Sarah W." },
    { text: "A chaotic masterpiece. I drive 40 minutes every morning just for the Void Cold Brew.", author: "Michael R." }
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % REVIEWS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative bg-[#050505] py-32 sm:py-48 px-6 lg:px-16 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] border-t border-white/5">
            <p className="text-[#6F4E37] text-xs tracking-[0.4em] uppercase font-light mb-16 text-center">
                Cult Following
            </p>

            <div className="relative w-full max-w-4xl h-48 sm:h-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                    >
                        <h4 className="text-2xl sm:text-4xl text-white/80 font-light italic leading-relaxed mb-6">
                            {`"${REVIEWS[index].text}"`}
                        </h4>
                        <span className="text-[#D4A373] text-sm tracking-widest uppercase">
                            — {REVIEWS[index].author}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex gap-4 mt-20">
                {REVIEWS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`transition-all duration-500 rounded-full ${i === index ? "w-8 h-1 bg-[#D4A373]" : "w-1 h-1 bg-white/20 hover:bg-white/40"
                            }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
