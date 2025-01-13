export const DesktopHeader = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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

        {/* Navigation links */}
        <ul className="flex space-x-4 text-white">
          {["Projects", "About", "Timeline", "Contact"].map((item) => (
            <li key={item}>
              <button
                className="hover:text-green-300 transition-colors duration-200 focus:outline-none"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
