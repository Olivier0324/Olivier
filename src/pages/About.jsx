// src/pages/About.jsx
import { motion } from "motion/react";
import { fadeUp } from "../lib/motion";

export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-20 text-center space-y-8"
    >
      <motion.h2
        initial="initial"
        whileInView="animate"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-3xl font-bold"
      >
        About Me
      </motion.h2>

      <motion.p
        initial="initial"
        whileInView="animate"
        variants={fadeUp}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
      >
        I’m a passionate <span className="font-semibold">Frontend Developer</span> 
        who loves building fast, accessible, and user-friendly web applications.  
        With a strong background in <span className="font-semibold">React, Tailwind CSS,</span> 
        and design systems, I aim to create interfaces that are both 
        <span className="font-semibold"> beautiful</span> and 
        <span className="font-semibold"> functional</span>.
      </motion.p>

      {/* Skills Grid */}
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={fadeUp}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10"
      >
        {["React", "Tailwind", "JavaScript", "UI/UX", "Git", "REST APIs"].map(
          (skill) => (
            <div
              key={skill}
              className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition"
            >
              {skill}
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}
