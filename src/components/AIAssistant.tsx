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

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // Simple NLP-based responses
    setTimeout(() => {
      let response = "";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes("freelance") || lowerInput.includes("service")) {
        response = "Prathish offers freelance services in AI technologies, including building AI-driven call support assistance, intelligent support systems, and AI-powered security solutions. You can contact him to discuss a project.";
      } else if (lowerInput.includes("hololens") || lowerInput.includes("game") || lowerInput.includes("pakalkuzhi")) {
        response = "Certainly. 'PakalKuzhi' is an MR game built with Unreal Engine and HoloLens 2. It's a traditional board game reimagined in mixed reality. Check out the Projects page for more details.";
      } else if (lowerInput.includes("phishing") || lowerInput.includes("detection")) {
        response = "The AI Phishing Detection system uses machine learning with 98.7% accuracy to identify malicious URLs. It was developed during his internship at IIT Madras and is featured on the projects page.";
      } else if (lowerInput.includes("skill") || lowerInput.includes("technology")) {
        response = "Prathish specializes in AI/ML (Python, scikit-learn, NLP), Cybersecurity (Penetration Testing, Metasploit, Burp Suite), and DevOps (Docker, Kubernetes, Jenkins). Visit the Blueprint page to see all his skills.";
      } else if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("intern")) {
        response = "Prathish has completed internships at IIT Madras (IITM Pravartak), Appinventiv Technologies, CloudThat Technologies, and Data Knight India, focusing on cybersecurity, AI/ML, and DevOps.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone")) {
        response = "You can reach Prathish at prathish1926@gmail.com or call him at +91 79044 03394. Visit the Contact page to send a message.";
      } else {
        response = "I can help you learn more about Prathish's projects, skills, work experience, or freelance services. What would you like to know?";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 500);
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg animate-pulse-glow"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] glass rounded-lg shadow-2xl flex flex-col border-glow-primary">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold">Architect's Assistant</span>
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

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
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
                className="flex-1"
              />
              <Button type="submit" size="icon">
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
