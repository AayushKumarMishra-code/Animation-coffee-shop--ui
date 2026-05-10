"use client";
import { motion } from "framer-motion";

const MENU_ITEMS = [
    { name: "Void Cold Brew", desc: "24-hour steep, profound depth.", price: "$6" },
    { name: "Mocha Noir", desc: "Cold brew layered with dark cacao.", price: "$8" },
    { name: "Iced Amber Latte", desc: "Espresso, silk milk, spiced honey.", price: "$7" },
    { name: "The Abyss", desc: "Double nitro cold brew. No milk.", price: "$6" },
    { name: "Chaos Cream", desc: "Cold brew topped with sea salt foam.", price: "$8" },
];

export default function Menu() {
    return (
        <section className="relative bg-[#080808] py-32 sm:py-48 px-6 lg:px-16 border-t border-white/5">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24">
                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#E8C9A0] mb-6"
                        >
                            The Library.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-white/50 font-light text-lg"
                        >
                            Select your disruption. Curated roasts, prepared with alarming precision.
                        </motion.p>
                    </div>

                    <div className="md:w-2/3 flex flex-col gap-10">
                        {MENU_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8"
                            >
                                <div className="flex-grow">
                                    <h3 className="text-xl sm:text-2xl text-white/90 font-medium mb-2 group-hover:text-[#D4A373] transition-colors">{item.name}</h3>
                                    <p className="text-sm text-white/40 font-light">{item.desc}</p>
                                </div>
                                <div className="hidden sm:block flex-grow border-b border-dotted border-white/20 mb-2 opacity-50 group-hover:border-[#D4A373] transition-colors"></div>
                                <div className="text-2xl font-light text-[#D4A373]">{item.price}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
