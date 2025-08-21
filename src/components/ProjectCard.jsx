// src/components/ProjectCard.jsx
import { motion } from "motion/react";

export default function ProjectCard({ image, link, category, description }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900 hover:shadow-xl transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <img
        src={image}
        alt={description}
        className="w-full h-48 object-cover group-hover:scale-105 transition"
      />
      <div className="p-4 space-y-2">
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          {category}
        </span>
        <p className="text-gray-800 dark:text-gray-100">{description}</p>
      </div>
    </motion.a>
  );
}
