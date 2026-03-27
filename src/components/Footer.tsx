import { Github, Linkedin, Mail } from "lucide-react";
<<<<<<< HEAD
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { data: content } = useSiteContent();
  const footerContent = content?.footer || {};

=======

const Footer = () => {
>>>>>>> 71d546271321b4845ab6f2d7ac3f16a6aceacdf7
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
<<<<<<< HEAD
            {footerContent.tagline || "Engineering Intelligent Systems with AI."}
=======
            Engineering Intelligent Systems with AI.
>>>>>>> 71d546271321b4845ab6f2d7ac3f16a6aceacdf7
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:ashok24dec02@gmail.com"
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-muted-foreground text-xs">
<<<<<<< HEAD
            © {new Date().getFullYear()} {content?.hero?.name || "Ashok Kumar G"}
=======
            © {new Date().getFullYear()} Ashok Kumar G
>>>>>>> 71d546271321b4845ab6f2d7ac3f16a6aceacdf7
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
