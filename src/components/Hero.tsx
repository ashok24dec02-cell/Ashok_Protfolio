import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import { useSiteContent } from "@/hooks/useSiteContent";

const Hero = () => {
  const { data: content } = useSiteContent();
  const heroContent = content?.hero || {};
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden network-bg">
      <NetworkBackground />
      
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-primary font-display text-sm sm:text-base tracking-widest uppercase mb-4">
            {heroContent.name || "Ashok Kumar G"}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
        >
          {heroContent.heading ? (
            <div dangerouslySetInnerHTML={{ __html: heroContent.heading }} />
          ) : (
            <>
              Building Intelligent Systems{" "}
              <br className="hidden sm:block" />
              with <span className="accent-text">AI, LLMs</span>{" "}
              <br className="hidden sm:block" />
              & <span className="accent-text">Computer Vision</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {heroContent.subheading || 
            "Junior AI / Machine Learning Engineer with startup experience delivering LLM-based systems, computer vision models, and AI-powered recommendation engines."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects" className="btn-primary inline-flex items-center gap-2 justify-center">
            View My Work
            <ArrowDown className="w-4 h-4" />
          </a>
          <a href="#contact" className="btn-outline inline-flex items-center gap-2 justify-center">
            <Mail className="w-4 h-4" />
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="w-5 h-5 animate-float" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
