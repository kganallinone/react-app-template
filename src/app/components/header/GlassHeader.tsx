import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close the menu after scrolling
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={` ${
        isMenuOpen ? " border-b border-green-500" : "border-b border-green-500 "
      } fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg  border-opacity-20 p-4`}
    >
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-bold">
          <img
            src="/kgan2-logo.png"
            alt="KGAN Logo"
            className="w-12 h-12"
            onClick={() => scrollToSection("home")}
          />
        </motion.div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-green-400">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul
          className={`md:flex md:space-x-4 ${
            isMenuOpen ? "block bg-black  " : "hidden border-opacity-10  "
          } absolute md:relative top-full left-0 right-0 md:top-auto  backdrop-filter backdrop-blur-lg md:bg-transparent  md:p-0  border-opacity-20 md:border-t-0`}
        >
          {["Projects", "About", "Timeline", "Contact"].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <Link
                to={`#${item.toLowerCase()}`}
                className="block py-2 text-center md:py-0 hover:text-green-300  transition-colors duration-200"
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  toggleMenu();
                }} //toggleMenu}
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};
