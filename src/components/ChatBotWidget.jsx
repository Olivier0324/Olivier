// src/components/ChatBotWidget.jsx
import React, { useMemo, useState } from "react";
import { Chatbot, createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css"; // required stylesheet per docs
import { MessageSquare, X } from "lucide-react";

// ⬇️ adjust the path to your data file if needed
import { projects } from "../data/projects";

// ====== DATA YOU CAN EDIT QUICKLY ======
const SKILLS = [
  "React.js", "Tailwind CSS", "JavaScript (ES6+)", "TypeScript",
  "Framer Motion", "Figma (UI/UX)", "Git & GitHub", "REST APIs",
];

const CONTACT = {
  email: "cyuzuzokwizeraolivier2@gmail.com",
  whatsapp: "250789097329",
  github: "https://github.com/your-username",
  youtube: "https://youtube.com/@your-handle",
  instagram: "https://instagram.com/your-handle",
  facebook: "https://facebook.com/your-handle",
};

const ABOUT = `Hi! I'm LittleTehie — a frontend developer focused on clean, fast,
accessible UIs using React and Tailwind. I also design in Figma and create
graphics in Illustrator/Photoshop.`;

// ====== SIMPLE WIDGETS (RENDERED INSIDE CHAT) ======
const Pills = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((t, i) => (
      <span
        key={i}
        className="inline-block px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      >
        {t}
      </span>
    ))}
  </div>
);

const ProjectsWidget = () => {
  // show up to 5, with link + category + description
  const list = projects.slice(0, 5);
  return (
    <div className="space-y-3">
      {list.map((p) => (
        <a
          key={p.id}
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <div className="text-sm font-semibold">
            {p.category}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-200">{p.description}</div>
        </a>
      ))}
      {projects.length > 5 && (
        <div className="text-xs text-gray-500">…and more on my Projects section.</div>
      )}
    </div>
  );
};

const ContactWidget = () => (
  <ul className="space-y-2 text-sm">
    <li><strong>Email:</strong> <a className="text-blue-600 dark:text-blue-400" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
    <li><strong>WhatsApp:</strong> <a className="text-blue-600 dark:text-blue-400" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">{CONTACT.whatsapp}</a></li>
    <li><strong>GitHub:</strong> <a className="text-blue-600 dark:text-blue-400" href={CONTACT.github} target="_blank" rel="noreferrer">{CONTACT.github}</a></li>
    <li><strong>YouTube:</strong> <a className="text-blue-600 dark:text-blue-400" href={CONTACT.youtube} target="_blank" rel="noreferrer">{CONTACT.youtube}</a></li>
    <li><strong>Instagram:</strong> <a className="text-blue-600 dark:text-blue-400" href={CONTACT.instagram} target="_blank" rel="noreferrer">{CONTACT.instagram}</a></li>
    <li><strong>Facebook:</strong> <a className="text-blue-600 dark:text-blue-400" href={CONTACT.facebook} target="_blank" rel="noreferrer">{CONTACT.facebook}</a></li>
  </ul>
);

const QuickOptions = (props) => {
  const { actionProvider } = props;
  const btn = "px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-700 hover:opacity-90";

  return (
    <div className="flex flex-wrap gap-2">
      <button className={btn} onClick={() => actionProvider.showSkills()}>Skills</button>
      <button className={btn} onClick={() => actionProvider.showProjects()}>Projects</button>
      <button className={btn} onClick={() => actionProvider.showContact()}>Contact</button>
      <button className={btn} onClick={() => actionProvider.showAbout()}>About</button>
    </div>
  );
};


// ====== INLINE CHATBOT CORE (CONFIG / PARSER / ACTIONS) ======
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // helper to push a message
  add(message) {
    this.setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }

  showWelcome = () => {
    const msg = this.createChatBotMessage(
      "Hi, I’m your portfolio assistant. What would you like to explore?",
      { widget: "quickOptions" }
    );
    this.add(msg);
  };

  showSkills = () => {
    const msg = this.createChatBotMessage("Here are some of my key skills:", {
      widget: "skillsWidget",
      delay: 300,
    });
    this.add(msg);
  };

  showProjects = () => {
    const msg = this.createChatBotMessage("A few highlighted projects:", {
      widget: "projectsWidget",
      delay: 300,
    });
    this.add(msg);
  };

  showContact = () => {
    const msg = this.createChatBotMessage("You can reach me here:", {
      widget: "contactWidget",
      delay: 300,
    });
    this.add(msg);
  };

  showAbout = () => {
    const msg = this.createChatBotMessage(ABOUT);
    this.add(msg);
  };
}

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }
  parse(message) {
    const text = (message || "").toLowerCase();

    if (/(skill|stack|tech|tools)/.test(text)) return this.actionProvider.showSkills();
    if (/(project|work|portfolio)/.test(text)) return this.actionProvider.showProjects();
    if (/(contact|email|reach|whatsapp|linkedin|github)/.test(text)) return this.actionProvider.showContact();
    if (/(about|who|bio|intro)/.test(text)) return this.actionProvider.showAbout();

    // default
    return this.actionProvider.showWelcome();
  }
}

// Build config (useMemo inside component to avoid re-creation on re-render)
const buildConfig = () => ({
  initialMessages: [
    createChatBotMessage("Welcome! I’m Olivier’s assistant 👋", {
      widget: "quickOptions",
    }),
  ],
  botName: "OlivierBot",
  customComponents: {}, // (optional) add custom header / avatars later
  customStyles: {
    botMessageBox: { backgroundColor: "#2563eb" }, // blue-600
    chatButton: { backgroundColor: "#2563eb" },
  },
  state: { }, // shared chatbot state if needed later
  widgets: [
    {
      widgetName: "quickOptions",
      widgetFunc: (props) => <QuickOptions {...props} />,
    },
    {
      widgetName: "skillsWidget",
      widgetFunc: () => <Pills items={SKILLS} />,
    },
    {
      widgetName: "projectsWidget",
      widgetFunc: () => <ProjectsWidget />,
    },
    {
      widgetName: "contactWidget",
      widgetFunc: () => <ContactWidget />,
    },
  ],
});

// ====== MAIN WIDGET WITH TOGGLER ======
export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const config = useMemo(buildConfig, []);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-5 right-5 z-50 rounded-full p-3 shadow-lg bg-blue-600 text-white hover:opacity-90 focus:outline-none"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[22rem] max-w-[90vw] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
                      placeholderText="Type: skills, projects, contact, about…"
                      
                      
          />
        </div>
      )}
    </>
  );
}
