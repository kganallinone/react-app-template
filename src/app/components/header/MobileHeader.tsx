import { useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";

export const MobileHeader = () => {
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-10 backdrop-blur-lg border-b border-green-500 border-opacity-20 p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <button
          className="text-2xl font-bold z-50 flex items-center space-x-2"
          onClick={() => scrollToSection("home")}
        >
          <img src="/kgan2-logo.png" alt="KGAN Logo" className="w-12 h-12" />
          <span className="text-white">KGAN</span>
        </button>

        {/* Menu button for mobile */}
        <button
          className="focus:outline-none md:hidden z-50"
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          onClick={toggleMenu}
        >
          <Hamburger toggled={isMenuOpen} size={24} color="white" />
        </button>

        {/* Navigation links */}
        <ul
          id="menu"
          className={`absolute md:relative mt-[18.5rem] bg-black w-full -ml-4 bg-opacity-90 md:bg-transparent border-t border-green-500 border-opacity-20 md:border-t-0 p-4 md:p-0 transition-all duration-300 ${
            isMenuOpen
              ? "block opacity-100"
              : "hidden md:block opacity-0 md:opacity-100"
          } flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 text-white`}
        >
          {["Projects", "About", "Timeline", "Contact"].map((item) => (
            <li key={item}>
              <button
                className="block py-2 md:py-0 hover:text-green-300 transition-colors duration-200 focus:outline-none"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};
