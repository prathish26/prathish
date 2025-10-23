import { useState } from "react";
import { Bot, Send, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome. I am Prathish's AI assistant. You can ask me about his projects, skills, or freelance services, or use the main navigation.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyD4kTuKjq5dcXM6-YL3gkxxWXzaWQNw0hg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Prathish Raj's AI assistant. Answer questions about his work, projects, skills, and experience. Context:
- Professional: Specializes in AI/ML, Cybersecurity, and DevOps
- Projects: AI Phishing Detection (98.7% accuracy), Pallanguzhi HoloLens 2 MR Game, Web Vulnerability Scanner, AI Mental Health Chatbot
- Skills: Python, Java, LLMs, Penetration Testing, Docker, Kubernetes, Unreal Engine 5
- Experience: Internships at IIT Madras, Cybertronium, Preston Consulting, NTech.labs, Kynhood
- Contact: prathish1926@gmail.com, +91 79044 03394
- Freelance: Available for AI-driven call support, intelligent support systems, AI security solutions

User question: ${userMessage}`
            }]
          }]
        })
      });
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I'm having trouble responding right now.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "I'm experiencing technical difficulties. Please try again or contact Prathish directly at prathish1926@gmail.com" 
      }]);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg animate-pulse-glow z-40"
          size="icon"
        >
          <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 h-[500px] max-h-[calc(100vh-2rem)] glass rounded-lg shadow-2xl flex flex-col border-glow-primary z-40">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm sm:text-base">Prathish's Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-3 sm:p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 sm:p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 sm:p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 text-sm"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
