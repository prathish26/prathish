import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Brain, Terminal, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [scanUrl, setScanUrl] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!scanUrl.trim()) return;
    setIsScanning(true);
    setScanResult("");

    setTimeout(() => {
      const isMalicious = Math.random() > 0.5;
      setScanResult(
        isMalicious
          ? "⚠️ MALICIOUS SITE DETECTED - Phishing indicators found"
          : "✓ SITE SECURE - No threats detected"
      );
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
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
      </section>

      {/* Summary Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass p-8 border-glow-primary">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Relentlessly curious and architect-minded, I thrive at the{" "}
              <span className="text-primary font-semibold">convergence of cybersecurity, DevOps, and AI automation</span>.
              My professional journey spans from building{" "}
              <span className="text-secondary font-semibold">AI-driven phishing detection systems</span> at IIT Madras to
              designing immersive{" "}
              <span className="text-accent font-semibold">MR experiences on HoloLens 2</span>.
              I believe the most impactful solutions are those that harmonize cutting-edge{" "}
              <span className="text-primary font-semibold">machine learning</span>, robust{" "}
              <span className="text-secondary font-semibold">security practices</span>, and scalable{" "}
              <span className="text-accent font-semibold">DevOps workflows</span>.
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
              
              <div className="bg-black/40 p-4 rounded-lg font-mono text-sm space-y-1 h-48 overflow-hidden">
                <div className="text-secondary">[+] Starting scan...</div>
                <div className="text-muted-foreground">[+] Target: example-site.com</div>
                <div className="text-secondary">[+] Checking for SQL Injection... [SECURE]</div>
                <div className="text-accent">[+] Checking for XSS... [VULNERABLE]</div>
                <div className="text-secondary">[+] Checking for CSRF... [SECURE]</div>
                <div className="text-accent">[+] Checking for Directory Traversal... [VULNERABLE]</div>
                <div className="text-muted-foreground">[+] Generating report...</div>
                <div className="text-primary animate-pulse">[+] Scan complete. 2 vulnerabilities found.</div>
              </div>

              <Link to="/projects" className="inline-flex items-center text-secondary hover:underline">
                View Full Project <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Card>

            {/* PakalKuzhi MR Game */}
            <Card className="glass p-6 space-y-4 border-glow-accent md:col-span-2">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold">PakalKuzhi - HoloLens 2 MR Game</h3>
              </div>
              <p className="text-muted-foreground">
                Traditional board game reimagined in mixed reality using Unreal Engine
              </p>
              
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-8 text-center space-y-4">
                <div className="text-6xl">🎮</div>
                <p className="text-lg font-semibold">Interactive MR Experience</p>
                <p className="text-sm text-muted-foreground">
                  Built with Unreal Engine 5 • HoloLens 2 • Spatial Computing
                </p>
              </div>

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
