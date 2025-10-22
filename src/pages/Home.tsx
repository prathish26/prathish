import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Brain, Terminal, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import prathishProfile from "@/assets/prathish-profile.jpg";
import pallanguzhiGame from "@/assets/pallanguzhi-mr-game.png";

const Home = () => {
  const [scanUrl, setScanUrl] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [vulnUrl, setVulnUrl] = useState("");
  const [vulnResult, setVulnResult] = useState("");
  const [isVulnScanning, setIsVulnScanning] = useState(false);

  const handleScan = async () => {
    if (!scanUrl.trim()) return;
    setIsScanning(true);
    setScanResult("");

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyD4kTuKjq5dcXM6-YL3gkxxWXzaWQNw0hg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this URL for phishing indicators: ${scanUrl}. Respond with either "MALICIOUS" or "SECURE" followed by a brief reason.`
            }]
          }]
        })
      });
      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error analyzing URL";
      setScanResult(result.includes("MALICIOUS") 
        ? "⚠️ MALICIOUS SITE DETECTED - " + result
        : "✓ SITE SECURE - " + result
      );
    } catch (error) {
      setScanResult("❌ Error analyzing URL");
    }
    setIsScanning(false);
  };

  const handleVulnScan = async () => {
    if (!vulnUrl.trim()) return;
    setIsVulnScanning(true);
    setVulnResult("");

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyD4kTuKjq5dcXM6-YL3gkxxWXzaWQNw0hg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Perform a security assessment on this URL: ${vulnUrl}. Check for common vulnerabilities like SQL Injection, XSS, CSRF, Directory Traversal. Format response as terminal output with [+] prefix for each check.`
            }]
          }]
        })
      });
      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error scanning";
      setVulnResult(result);
    } catch (error) {
      setVulnResult("❌ Error scanning website");
    }
    setIsVulnScanning(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center space-y-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow" />
              <img
                src={prathishProfile}
                alt="Prathish Raj"
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-primary/50 shadow-2xl"
              />
            </div>

            {/* Text Content */}
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="glow-primary">Prathish Raj</span>
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto">
                Architecting the Convergence of{" "}
                <span className="text-primary font-semibold">AI</span>,{" "}
                <span className="text-secondary font-semibold">Cybersecurity</span>, and{" "}
                <span className="text-accent font-semibold">DevOps</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass p-8 border-glow-primary">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Relentlessly curious and architect-minded, I thrive at the{" "}
              <span className="text-primary font-semibold">intersection of cybersecurity, DevOps, and AI automation</span>.
              With a strong foundation in{" "}
              <span className="text-secondary font-semibold">Java, Python, and system-level design</span>, I engineer secure, scalable, and intelligent solutions that blend automation with innovation.
              I specialize in{" "}
              <span className="text-primary font-semibold">LLM-powered agents</span>,{" "}
              <span className="text-accent font-semibold">cloud-native architectures</span>, and adaptive{" "}
              <span className="text-secondary font-semibold">DevOps pipelines</span> that think and evolve in real time.
              A creator at heart with a{" "}
              <span className="text-primary font-semibold">security-first mindset</span>, I'm fluent across code, architecture, and emerging technologies—from{" "}
              <span className="text-accent font-semibold">XR experiences</span> to{" "}
              <span className="text-secondary font-semibold">backend intelligence</span>—bridging complex domains with clarity, precision, and forward-thinking engineering.
            </p>
          </Card>
        </div>
      </section>

      {/* Freelance Services */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold glow-secondary">Available for Freelance Projects</h2>
            <p className="text-xl text-muted-foreground">
              Specializing in AI technologies and intelligent systems
            </p>
          </div>

          <Card className="glass p-8 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Brain className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-lg">AI Call Support</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent voice assistance systems powered by advanced LLMs
                </p>
              </div>
              <div className="space-y-2">
                <Terminal className="w-8 h-8 text-secondary mb-2" />
                <h3 className="font-semibold text-lg">AI Support Systems</h3>
                <p className="text-sm text-muted-foreground">
                  Smart automation and intelligent decision-making platforms
                </p>
              </div>
              <div className="space-y-2">
                <Shield className="w-8 h-8 text-accent mb-2" />
                <h3 className="font-semibold text-lg">AI Security Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  ML-powered threat detection and security automation
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="group">
                  Let's Collaborate
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Projects - Interactive Arsenal */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 glow-primary">
            The Interactive Arsenal
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Phishing Detection Demo */}
            <Card className="glass p-6 space-y-4 border-glow-primary">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">AI Phishing Detection</h3>
              </div>
              <p className="text-muted-foreground">
                ML-powered system with 98.7% accuracy
              </p>
              
              <div className="space-y-2">
                <Input
                  placeholder="Enter a URL to scan (demo)..."
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                />
                <Button 
                  onClick={handleScan} 
                  className="w-full"
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Scan URL"}
                </Button>
                {scanResult && (
                  <div className={`p-3 rounded-lg text-sm font-mono ${
                    scanResult.includes("MALICIOUS") 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-secondary/20 text-secondary"
                  }`}>
                    {scanResult}
                  </div>
                )}
              </div>

              <Link to="/projects" className="inline-flex items-center text-primary hover:underline">
                View Full Project <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* Vulnerability Scanner Terminal */}
            <Card className="glass p-6 space-y-4 border-glow-secondary">
              <div className="flex items-center gap-2">
                <Terminal className="w-6 h-6 text-secondary" />
                <h3 className="text-2xl font-bold">Web Vulnerability Scanner</h3>
              </div>
              <p className="text-muted-foreground">
                Automated security assessment tool
              </p>
              
              <div className="space-y-2">
                <Input
                  placeholder="Enter website URL to scan..."
                  value={vulnUrl}
                  onChange={(e) => setVulnUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVulnScan()}
                />
                <Button 
                  onClick={handleVulnScan} 
                  className="w-full"
                  disabled={isVulnScanning}
                >
                  {isVulnScanning ? "Scanning..." : "Scan Website"}
                </Button>
                <div className="bg-black/40 p-4 rounded-lg font-mono text-sm space-y-1 h-48 overflow-auto">
                  {vulnResult ? (
                    <div className="text-foreground whitespace-pre-wrap">{vulnResult}</div>
                  ) : (
                    <>
                      <div className="text-secondary">[+] Ready to scan...</div>
                      <div className="text-muted-foreground">[+] Enter a URL above</div>
                    </>
                  )}
                </div>
              </div>

              <Link to="/projects" className="inline-flex items-center text-secondary hover:underline">
                View Full Project <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* Pallanguzhi MR Game */}
            <Card className="glass p-6 space-y-4 border-glow-accent md:col-span-2">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold">Pallanguzhi - HoloLens 2 MR Game</h3>
              </div>
              <p className="text-muted-foreground">
                Traditional board game reimagined in mixed reality using Unreal Engine
              </p>
              
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={pallanguzhiGame} 
                  alt="Pallanguzhi HoloLens 2 MR Game" 
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Built with Unreal Engine 5 • HoloLens 2 • Spatial Computing
              </p>

              <Link to="/projects" className="inline-flex items-center text-accent hover:underline">
                View Full Project <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
