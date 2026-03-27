import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const responsibilities = [
  "Built and deployed a dynamic LLM-powered chatbot using RAG for a company website with context-aware internal data retrieval.",
  "Led AI integration for a School Management System with multiple ML models for academic analytics and workflow automation.",
  "Developed a fabric defect detection system using YOLO-based object detection (dataset preparation, training, inference).",
  "Built HRMS ATS & resume-job recommendation engine using similarity-based ranking techniques.",
  "Implemented AI features for an e-learning platform including speech-to-text transcription, automated notes, MCQ generation, and doubt-resolution chatbot.",
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: content } = useSiteContent();
  const experienceContent = content?.experience || {};

  return (
    <section id="experience" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-2">Career</p>
          <h2 className="section-title">
            Work <span className="accent-text">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 card-glass rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">
                {experienceContent.role || "Software Developer Intern (AI/ML)"}
              </h3>
              <p className="text-primary font-medium">
                {experienceContent.company || "Vienstereoptic Pvt. Ltd."}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {experienceContent.duration || "Oct 2025 – Present"}
                </p>
             </div>
          </div>

          <ul className="space-y-4">
            {responsibilities.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="flex gap-3 text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
