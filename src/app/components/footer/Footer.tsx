import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-t border-green-500 border-opacity-20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-green-400">KGAN</h3>
            <p className="text-sm text-green-300 mt-1">
              Transforming Your Ideas into Reality
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/kganallinone"
              className="text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kganallinone"
              className="text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-green-300">
          {/* &copy; {new Date().getFullYear()} KGAN. All rights reserved. */}
          &copy; 2023 KGAN. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
