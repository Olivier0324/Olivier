import React from "react";
import { motion } from "framer-motion";

const skills = ["React JS", "Tailwind CSS", "JavaScript", "Figma",'Balsimiq', "Git And Github", "REST APIs","HTML","CSS","Adobe Photoshop","Adobe Illustrator","Communicating with AI Tools","Basic CLI"];

const About = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500" id="about">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        {/* Intro text */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Hi, I’m <span className="font-semibold">CYUZUZO KWIZERA Olivier</span>, a passionate Frontend Developer
          who loves building modern and interactive web experiences using{" "}
          <span className="font-semibold">React</span> and{" "}
          <span className="font-semibold">Tailwind CSS</span>.  
          My focus is on creating clean, user-friendly, and efficient designs that provide
          great user experiences.
        </motion.p>

        {/* 🎥 YouTube Intro Video */}
        <motion.div
          className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Uf3-rKnDbTg?si=iwAFPy_1uTQezh0r"
            title="Intro video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            My Skills
          </h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.li
                key={index}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
