import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Cpu, BookOpen, Search } from "lucide-react";

const projects = [
  {
    icon: GraduationCap,
    title: "School Management System – AI Integration",
    points: [
      "Integrated ML models into production system",
      "Automated analytics and academic insights",
      "Improved administrative efficiency",
    ],
  },
  {
    icon: Search,
    title: "HRMS ATS & Recommendation Engine",
    points: [
      "Resume-to-job recommendation pipeline",
      "Feature extraction + similarity scoring",
      "Candidate ranking logic for recruiters",
    ],
  },
  {
    icon: BookOpen,
    title: "LLM-Based Educational Assistant",
    points: [
      "Real-time lecture transcription",
      "Automated summary & notes generation",
      "MCQ generation & AI doubt-resolution chatbot",
    ],
  },
  {
    icon: Cpu,
    title: "Fabric Defect Detection App",
    points: [
      "YOLO-based object detection model",
      "Dataset preprocessing & model training",
      "Accuracy optimization & evaluation",
    ],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-2">Portfolio</p>
          <h2 className="section-title">
            My <span className="accent-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="card-glass rounded-2xl p-6 group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <project.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-3">{project.title}</h3>
              <ul className="space-y-2">
                {project.points.map((point, j) => (
                  <li key={j} className="flex gap-2 text-muted-foreground text-sm">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
