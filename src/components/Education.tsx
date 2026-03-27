import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const certifications = [
  "AI Programmer Certification – TNSDC",
  "NPTEL – Introduction to C Programming",
  "Python Virtual Internship – TNSDC",
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={ref}>
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-display text-sm tracking-widest uppercase mb-2">Background</p>
            <h2 className="section-title mb-8">
              <span className="accent-text">Education</span>
            </h2>

            <div className="card-glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">B.E. Computer Science and Engineering</h3>
                  <p className="text-muted-foreground mt-1">St. Mother Theresa Engineering College</p>
                  <div className="flex gap-4 mt-3">
                    <span className="px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary">CGPA: 8.24</span>
                    <span className="px-3 py-1 text-sm rounded-lg bg-secondary text-muted-foreground">2021 – 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary font-display text-sm tracking-widest uppercase mb-2">Credentials</p>
            <h2 className="section-title mb-8">
              <span className="accent-text">Certifications</span>
            </h2>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="card-glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/40 transition-all duration-300"
                >
                  <Award className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
