import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-card-foreground mt-24 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold">HS</span>
              </div>
              <h3 className="text-lg font-bold">HS LearnPath+</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering education through technology and innovation.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 hover:bg-card/50 rounded-lg transition-colors duration-200" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-card/50 rounded-lg transition-colors duration-200" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-card/50 rounded-lg transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-card/50 rounded-lg transition-colors duration-200" aria-label="Github">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Features</a></li>
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Security</a></li>
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Roadmap</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-card-foreground transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:support@learnpath.com" className="hover:text-card-foreground transition-colors duration-200">
                  support@learnpath.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+1234567890" className="hover:text-card-foreground transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>123 Education St, Learning City, LC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 HS LearnPath+. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-card-foreground transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-card-foreground transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-card-foreground transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;