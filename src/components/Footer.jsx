// src/components/Footer.jsx
import { Github, Youtube, Facebook, Instagram, MessageCircle } from "lucide-react";

const socials = [
  { name: "GitHub", href: "https://github.com/Olivier0324", icon: Github },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCljl7CAET2pkXamlE9ADXrg", icon: Youtube },
  { name: "Facebook", href: "https://web.facebook.com/cyuzuzokwizera.ollyolivis", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/cyuzuzokwizeraolivier/", icon: Instagram },
  { name: "WhatsApp", href: "https://wa.me/250789097329", icon: MessageCircle }, // replace number like 2507XXXXXXX
];
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Social icons */}
        <div className="flex gap-6">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
            >
              <Icon className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} LittleTehie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
