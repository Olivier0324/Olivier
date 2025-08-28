
import { useState, useRef, useEffect } from "react";
import { HfInference } from "@huggingface/inference";

const HF_TOKEN = String(import.meta.env.VITE_HF_TOKEN || "");
const WEB3FORMS_ACCESS_KEY = "4849d158-e819-406b-80a8-8de3add44b1b";

export default function SecretaryAgent() {
  const [model] = useState("deepseek-ai/DeepSeek-V3-0324");
  
  // System prompt with all your information
  const systemPrompt = `You are the AI secretary assistant for Cyuzuzo Kwizera Olivier. Always respond in English. 
  Your role includes:
  1. Answering inquiries about Olivier based on his portfolio
  2. Taking messages for Olivier
  3. Scheduling appointments on Olivier's calendar
  4. Providing daily itinerary information
  
  ABOUT OLIVIER:
  - Name: Cyuzuzo Kwizera Olivier
  - Profession: UI/UX Designer and Frontend Developer
  - Skills: React JS, Tailwind CSS, JavaScript, Figma, Balsamiq, Git, GitHub, REST APIs, HTML, CSS, Adobe Photoshop, Adobe Illustrator, AI Tools, Basic CLI
  - Specialization: Building modern, fast, and responsive web applications with HTML, CSS, JavaScript, Figma, React and Tailwind CSS
  
  PROJECTS:
  1. Mobile Application Prototype - UI/UX Design (Figma)
  2. News Reader Interface - UI/UX Design (Figma)
  3. News Reader Web App - Frontend Development (React.js + Tailwind CSS)
  4. SYNTAX Promotional Poster - Graphic Design (Adobe Illustrator)
  5. Creative Photoshop Poster - Graphic Design (Photoshop)
  6. SYNTAKS Logo Design - Graphic Design (Adobe Illustrator)
  7. Educational Poster - Graphic Design
  8. Portrait Photo Editing - Graphic Design (Photoshop)
  9. Bar Promotional Poster - Graphic Design
  
  CONTACT INFORMATION:
  - GitHub: https://github.com/Olivier0324
  - YouTube: https://www.youtube.com/channel/UCljl7CAET2pkXamlE9ADXrg
  - Facebook: https://web.facebook.com/cyuzuzokwizera.ollyolivis
  - Instagram: https://www.instagram.com/cyuzuzokwizeraolivier/
  - WhatsApp: https://wa.me/250789097329
  - CV: https://drive.google.com/file/d/1-KKvjbPYrMof9SDTTWO16urOjUnWg8Im/view
  - Email: cyuzuzokwizeraOlivier2@gmail.com
  
  APPOINTMENT SCHEDULING:
  - Olivier is available for meetings on weekdays from 9 AM to 5 PM (Rwandan Time)
  - Please provide your name, email, preferred date/time, and meeting purpose
  - You'll receive a confirmation email within 24 hours
  
  If asked about anything else, politely redirect back to topics about Olivier's portfolio and expertise.`;
  
  const [messages, setMessages] = useState([{ role: "system", content: systemPrompt }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    purpose: ""
  });
  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const listRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // Format message content with proper styling for links and lists
  const formatMessage = (content) => {
    // Convert URLs to clickable links
    let formattedContent = content.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>'
    );
    
    // Format numbered lists
    formattedContent = formattedContent.replace(
      /(\d+\.\s)(.*?)(?=\d+\.\s|$)/gs, 
      '<div class="my-1"><span class="font-medium">$1</span>$2</div>'
    );
    
    // Format bullet points
    formattedContent = formattedContent.replace(
      /(-\s)(.*?)(?=-\s|$)/gs, 
      '<div class="my-1"><span class="font-medium">• </span>$2</div>'
    );
    
    // Format bold text
    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong class="font-semibold">$1</strong>'
    );
    
    return { __html: formattedContent };
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    
    // Add user message to chat
    const userMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const hf = new HfInference(HF_TOKEN);
      
      // Prepare messages for the API - include system prompt and conversation history
      const apiMessages = [
        { role: "system", content: systemPrompt },
        ...nextMessages.filter(m => m.role !== "system")
      ];
      
      const response = await hf.chatCompletion({
        model: model,
        messages: apiMessages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = response.choices?.[0]?.message?.content?.trim() || "(no reply)";
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("HF Error:", err);
      setMessages([...nextMessages, { 
        role: "assistant", 
        content: "⚠️ Error: Could not connect to AI service. Please check your API token." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([{ role: "system", content: systemPrompt }]);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "your-web3forms-access-key-here") {
      setFormStatus({ 
        message: "Web3Forms access key not configured. Appointment not sent.", 
        type: "error" 
      });
      setTimeout(() => setFormStatus({ message: "", type: "" }), 5000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", "New Appointment Request from Portfolio Website");
      formData.append("name", appointmentForm.name);
      formData.append("email", appointmentForm.email);
      formData.append("date", appointmentForm.date);
      formData.append("time", appointmentForm.time);
      formData.append("purpose", appointmentForm.purpose);
      formData.append("replyto", appointmentForm.email);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({ 
          message: "Appointment request sent successfully! Olivier will confirm via email.", 
          type: "success" 
        });
        setAppointmentForm({
          name: "",
          email: "",
          date: "",
          time: "",
          purpose: ""
        });
      } else {
        setFormStatus({ 
          message: "Failed to send appointment request. Please try again.", 
        });
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setFormStatus({ 
        message: "Error sending appointment request. Please try again.", 
        type: "error" 
      });
    }
    
    setTimeout(() => setFormStatus({ message: "", type: "" }), 5000);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "your-web3forms-access-key-here") {
      setFormStatus({ 
        message: "Web3Forms access key not configured. Message not sent.", 
        type: "error" 
      });
      setTimeout(() => setFormStatus({ message: "", type: "" }), 5000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", "New Message from Portfolio Website");
      formData.append("name", messageForm.name);
      formData.append("email", messageForm.email);
      formData.append("message", messageForm.message);
      formData.append("replyto", messageForm.email);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({ 
          message: "Message sent successfully! Olivier will get back to you soon.", 
          type: "success" 
        });
        setMessageForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
        setFormStatus({ 
          message: "Failed to send message. Please try again.", 
          type: "error" 
        });
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setFormStatus({ 
        message: "Error sending message. Please try again.", 
        type: "error" 
      });
    }
    
    setTimeout(() => setFormStatus({ message: "", type: "" }), 5000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Status message */}
      {formStatus.message && (
        <div className={`mb-2 px-4 py-2 rounded-lg text-sm ${
          formStatus.type === "success" 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {formStatus.message}
        </div>
      )}

      {/* Secretary toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 ring-2 ring-white"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Secretary container */}
      {isOpen && (
        <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">Olivier's Secretary</h2>
              <p className="text-xs opacity-90">AI Assistant & Scheduling</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={clearChat}
                className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                title="Clear conversation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-blue-500 transition-colors"
                title="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <button
              className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === "chat" ? "text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-800" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("chat")}
            >
              💬 Chat
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === "appointment" ? "text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-800" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("appointment")}
            >
              📅 Appointment
            </button>
            <button
              className={`flex-1 py-2 text-sm font-medium transition-colors ${activeTab === "message" ? "text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-800" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              onClick={() => setActiveTab("message")}
            >
              ✉️ Message
            </button>
          </div>

          {/* Content based on active tab */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === "chat" && (
              <>
                {/* Messages container */}
                <div 
                  ref={listRef}
                  className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900"
                >
                  {messages.filter(m => m.role !== 'system').map((m, i) => (
                    <div
                      key={i}
                      className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-3 ${
                          m.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <div className="font-medium text-xs mb-2 opacity-80">
                          {m.role === 'user' ? 'You' : "Olivier's Assistant"}
                        </div>
                        <div 
                          className="text-sm prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={formatMessage(m.content)}
                        />
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg rounded-bl-none px-4 py-3 max-w-xs shadow-sm">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          <span className="text-xs text-gray-500 ml-1">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                  <div className="flex space-x-2">
                    <textarea
                      rows={1}
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={loading}
                      placeholder="Ask about Olivier's skills, projects, or contact info..."
                    />
                    <button
                      onClick={send}
                      disabled={loading || !input.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                      title="Send message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "appointment" && (
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4 text-center">Schedule an Appointment</h3>
                  <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        value={appointmentForm.name}
                        onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        value={appointmentForm.email}
                        onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          value={appointmentForm.date}
                          onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                        <input
                          type="time"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          value={appointmentForm.time}
                          onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meeting Purpose</label>
                      <textarea
                        rows={3}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        value={appointmentForm.purpose}
                        onChange={(e) => setAppointmentForm({...appointmentForm, purpose: e.target.value})}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      Schedule Appointment
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "message" && (
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4 text-center">Leave a Message</h3>
                  <form onSubmit={handleMessageSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        value={messageForm.name}
                        onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        value={messageForm.email}
                        onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                      <textarea
                        rows={4}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        value={messageForm.message}
                        onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}