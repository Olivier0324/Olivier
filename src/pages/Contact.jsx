// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "motion/react";
import { fadeUp } from "../lib/motion";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", "4849d158-e819-406b-80a8-8de3add44b1b"); // 🔑 replace with your key

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (res.success) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto px-6 py-20 space-y-10 text-center"
    >
      <motion.h2
        initial="initial"
        whileInView="animate"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-3xl font-bold"
      >
        Contact Me
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        initial="initial"
        whileInView="animate"
        variants={fadeUp}
        viewport={{ once: true }}
        className="max-w-xl mx-auto grid gap-6 text-left"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Status message */}
      {status === "success" && (
        <p className="text-green-600 dark:text-green-400">
          ✅ Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 dark:text-red-400">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
