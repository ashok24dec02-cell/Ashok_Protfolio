import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "Programming & ML",
    skills: ["Python", "SQL", "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "LLMs"],
  },
  {
    title: "Frameworks & Tools",
    skills: ["TensorFlow", "Keras", "YOLO", "Tableau", "Power BI", "Git", "REST APIs"],
  },
  {
    title: "Foundations",
    skills: ["Data Preprocessing", "Feature Engineering", "Model Training & Evaluation"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-2">Technical</p>
          <h2 className="section-title">
            My <span className="accent-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="card-glass rounded-2xl p-6"
            >
              <h3 className="font-display font-bold text-foreground mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
