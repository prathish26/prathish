import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Brain, Terminal, Bot, Code, Gamepad2 } from "lucide-react";

const projects = [
  {
    icon: Shield,
    title: "AI Phishing Detection System",
    challenge: "Detecting sophisticated phishing attacks that evade traditional security measures.",
    solution: "Developed a machine learning-based phishing detection system using advanced NLP and feature extraction techniques. The system analyzes URL patterns, content characteristics, and behavioral indicators to identify malicious websites with 98.7% accuracy.",
    tech: ["Python", "ML/DL", "NLP", "scikit-learn", "Feature Engineering"],
    color: "primary"
  },
  {
    icon: Gamepad2,
    title: "PakalKuzhi - HoloLens 2 MR Game",
    challenge: "Bringing traditional board games into the modern era through immersive mixed reality.",
    solution: "Created an interactive mixed reality version of the traditional PakalKuzhi board game using Unreal Engine 5 and HoloLens 2. Players can interact with holographic game pieces in their physical space, blending cultural heritage with cutting-edge spatial computing.",
    tech: ["Unreal Engine 5", "HoloLens 2", "C++", "Mixed Reality", "Spatial Computing"],
    color: "accent"
  },
  {
    icon: Terminal,
    title: "Web Application Vulnerability Scanner",
    challenge: "Identifying security vulnerabilities in web applications before attackers can exploit them.",
    solution: "Built an automated vulnerability assessment tool using OWASP ZAP and custom Python scripts. The scanner performs comprehensive security checks including SQL injection, XSS, CSRF, and authentication bypass vulnerabilities, generating detailed remediation reports.",
    tech: ["Python", "OWASP ZAP", "Penetration Testing", "Security Automation"],
    color: "secondary"
  },
  {
    icon: Bot,
    title: "AI Mental Health Chatbot",
    challenge: "Providing accessible mental health support through conversational AI.",
    solution: "Developed an empathetic AI chatbot using large language models that provides mental health support, mood tracking, and personalized coping strategies. The system uses sentiment analysis and contextual understanding to deliver appropriate responses.",
    tech: ["Python", "LLMs", "NLP", "Sentiment Analysis", "Conversational AI"],
    color: "primary"
  },
  {
    icon: Code,
    title: "Desktop Automation Suite",
    challenge: "Streamlining repetitive desktop tasks to improve productivity.",
    solution: "Created a comprehensive desktop automation platform using Python that handles file management, data processing, and workflow automation. The system includes a user-friendly interface and supports custom automation scripts.",
    tech: ["Python", "PyAutoGUI", "Task Automation", "GUI Development"],
    color: "accent"
  },
  {
    icon: Shield,
    title: "Cloud Security Infrastructure",
    challenge: "Securing cloud deployments against modern threats while maintaining performance.",
    solution: "Designed and implemented a comprehensive cloud security architecture on Oracle Cloud Infrastructure, including automated threat detection, compliance monitoring, and incident response workflows using Infrastructure as Code.",
    tech: ["OCI", "Terraform", "Security Automation", "Cloud Architecture", "IaC"],
    color: "secondary"
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold glow-primary">Case Studies</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dives into projects at the intersection of AI, security, and innovation
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card key={index} className="glass p-8 space-y-6 border-glow-primary">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${project.color}/20`}>
                    <Icon className={`w-8 h-8 text-${project.color}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      The Challenge
                    </h3>
                    <p className="text-foreground">{project.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      The Solution
                    </h3>
                    <p className="text-foreground leading-relaxed">{project.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
