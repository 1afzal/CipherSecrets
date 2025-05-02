import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-hacker-black py-4 border-b border-matrix-green">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/">
            <h1 className="text-3xl md:text-4xl font-bold text-matrix-green tracking-wide cursor-pointer">
              <span className="text-electric-blue">&lt;</span>Cipher<span className="text-terminal-green">Space</span><span className="text-electric-blue">/&gt;</span>
            </h1>
          </Link>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center space-x-2 md:space-x-6">
            <li>
              <Link href="/#about">
                <a className={`text-terminal-green hover:text-matrix-green transition duration-300 ${location === "/#about" ? "text-matrix-green" : ""}`}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#algorithms">
                <a className={`text-terminal-green hover:text-matrix-green transition duration-300 ${location === "/#algorithms" ? "text-matrix-green" : ""}`}>
                  Algorithms
                </a>
              </Link>
            </li>
            <li>
              <Link href="/compare">
                <a className={`text-terminal-green hover:text-matrix-green transition duration-300 ${location === "/compare" ? "text-matrix-green" : ""}`}>
                  Compare
                </a>
              </Link>
            </li>
            <li>
              <Link href="/playground">
                <a className={`text-terminal-green hover:text-matrix-green transition duration-300 ${location === "/playground" ? "text-matrix-green" : ""}`}>
                  Playground
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
