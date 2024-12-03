import React from "react";
import { motion } from "framer-motion";

export default function AnimatedHeading() {
    return (
        <div>
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl font-bold mb-4 text-gray-800 text-center"
            >
                Discover the Benefits of Lesson Generator
            </motion.h1>

            {/* Animated Line */}
            <motion.svg
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 10"
                className="mx-auto w-full max-w-[500px] h-[10px]"
            >
                <motion.path
                    d="M0 5 Q500 30 1000 5"
                    fill="transparent"
                    stroke="#008000"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </motion.svg>
        </div>
    );
}
