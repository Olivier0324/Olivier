// src/components/Hero.jsx
import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";
import { fadeUp } from "../lib/motion";
import olivier from '../assets/images/Olivier.png'

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center" id="home">
      {/* Left Side: Text */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUp}
        className="space-y-6"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Hi, I’m <span className="text-indigo-600 dark:text-indigo-400">Olivier</span>
        </h1>

        <TypeAnimation
          sequence={[
            "I am a Frontend Developer", 2000,
            "I am a UI/UX Designer", 2000,
            "I am a Graphic Designer", 2000,
            "I am a Junior Prompt Engineer", 2000,
          ]}
          speed={50}
          wrapper="span"
          repeat={Infinity}
          className="block text-2xl sm:text-3xl text-gray-700 dark:text-gray-200 font-semibold"
        />

        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          I build modern, fast, and responsive web applications with HTML, CSS Javascript, Figma, React and Tailwind CSS. 
          Let’s create something amazing together!
        </p>

        <div className="flex gap-4">
          <a
            href="https://drive.google.com/file/d/1-KKvjbPYrMof9SDTTWO16urOjUnWg8Im/view?usp=sharing"
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
          >
            Download my CV
          </a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-xl border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Right Side: Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center"
      >
        <img
          src={olivier}
          alt="Developer illustration"
          className="rounded-2xl shadow-lg w-full md:w-1/2 object-cover"
        />
      </motion.div>
    </section>
  );
}
