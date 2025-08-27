// src/pages/Projects.jsx
import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import FilterBar from "../components/FilterBar";

export default function Projects() {
  const categories = [...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12" id="projects">
      <h2 className="text-2xl font-bold mb-6 text-center">My Projects</h2>
      <FilterBar categories={categories} active={active} setActive={setActive} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>
    </section>
  );
}
