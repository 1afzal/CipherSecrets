import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-hacker-black border-t border-matrix-green py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <h2 className="text-2xl font-bold text-matrix-green cursor-pointer">
                <span className="text-electric-blue">&lt;</span>Cipher<span className="text-terminal-green">Space</span><span className="text-electric-blue">/&gt;</span>
              </h2>
            </Link>
            <p className="text-sm text-terminal-text mt-1">Demystifying encryption algorithms</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-terminal-green font-bold mb-2">Navigation</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/#about"><a className="text-terminal-text hover:text-matrix-green transition-colors">About</a></Link></li>
                <li><Link href="/#algorithms"><a className="text-terminal-text hover:text-matrix-green transition-colors">Algorithms</a></Link></li>
                <li><Link href="/compare"><a className="text-terminal-text hover:text-matrix-green transition-colors">Compare</a></Link></li>
                <li><Link href="/playground"><a className="text-terminal-text hover:text-matrix-green transition-colors">Playground</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-terminal-green font-bold mb-2">Resources</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://en.wikipedia.org/wiki/Cryptography" target="_blank" rel="noopener noreferrer" className="text-terminal-text hover:text-matrix-green transition-colors">Cryptography Guide</a></li>
                <li><a href="https://csrc.nist.gov/Projects/cryptographic-standards-and-guidelines" target="_blank" rel="noopener noreferrer" className="text-terminal-text hover:text-matrix-green transition-colors">NIST Standards</a></li>
                <li><a href="https://www.owasp.org/index.php/Cryptographic_Storage_Cheat_Sheet" target="_blank" rel="noopener noreferrer" className="text-terminal-text hover:text-matrix-green transition-colors">Security Best Practices</a></li>
                <li><a href="https://github.com/brix/crypto-js" target="_blank" rel="noopener noreferrer" className="text-terminal-text hover:text-matrix-green transition-colors">CryptoJS Library</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-terminal-text mt-8">
          <p>&copy; {new Date().getFullYear()} CipherSpace. All rights reserved.</p>
          <p className="mt-1">Made with 💚 for encryption enthusiasts</p>
        </div>
      </div>
    </footer>
  );
}
