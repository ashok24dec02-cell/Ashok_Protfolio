import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Eye, Bot, BarChart3 } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const highlightsKeys = [
  { icon: Brain, label: "LLM Systems" },
  { icon: Eye, label: "Computer Vision" },
  { icon: Bot, label: "AI Chatbots" },
  { icon: BarChart3, label: "ML Analytics" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: content } = useSiteContent();
  const aboutContent = content?.about || {};

  return (
    <section id="about" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-widest uppercase mb-2">Get to know me</p>
          <h2 className="section-title">
            About <span className="accent-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              {aboutContent.paragraph1 || 
                "I am a Junior AI / Machine Learning Engineer with hands-on startup experience building real-world AI systems. I specialize in LLM-powered applications, computer vision models, and intelligent recommendation systems."}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {aboutContent.paragraph2 || 
                "Currently working as a Software Developer Intern (AI/ML) at Vienstereoptic Pvt. Ltd., where I design and deploy production-level AI features for web platforms and enterprise systems."}
            </p>
            <p className="text-foreground font-medium">
              {aboutContent.highlight || 
                "I focus on building scalable, practical AI solutions that solve business problems."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlightsKeys.map((item, i) => (
              <div
                key={item.label}
                className="card-glass rounded-xl p-5 flex flex-col items-center justify-center gap-3 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <item.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
