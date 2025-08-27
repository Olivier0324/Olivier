
import ChatBotWidget from "./components/ChatBotWidget";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";


export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 scroll-smooth">
      <Navbar/>
      <Hero/>
      <Projects />
      <About />
      <Contact />
      <Footer />
     <ChatBotWidget/>
    </div>
  );
}