import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Award } from "lucide-react";

const experiences = [
  {
    role: "Drone Security & Automation Intern",
    company: "NTech.labs - Chennai, India",
    period: "June 2025 - July 2025",
    achievements: [
      "Assisted in developing security features for drone communication using encrypted radio frequencies",
      "Contributed to automation of drone functions and secured data transmission protocols"
    ]
  },
  {
    role: "Penetration Testing Intern",
    company: "Cybertronium Sdn.Bhd. - Malaysia",
    period: "February 2025 - March 2025",
    achievements: [
      "Conducted real-time penetration testing on web and mobile platforms using OWASP and OSWAP tools",
      "Performed vulnerability assessments, zero-click exploits, and post-exploitation analysis in lab environments"
    ]
  },
  {
    role: "AI Call Automation Intern",
    company: "Preston Consulting and EdTech Pvt Ltd - Chennai, India",
    period: "June 2024 - July 2024",
    achievements: [
      "Developed an AI-based call automation system integrated with chatbot functionality for client interaction",
      "Applied Natural Language Processing (NLP) for user intent recognition and response generation"
    ]
  },
  {
    role: "Multi-Media Intern",
    company: "Kynhood technologies private limited - Chennai, India",
    period: "June 2023 - July 2023",
    achievements: [
      "Contributed to multimedia content creation, video editing, and motion graphics for internal and external use",
      "Designed creative assets for marketing campaigns, client presentations, and social media content"
    ]
  }
];

const skillCategories = {
  "All": [],
  "Cybersecurity": [
    "Penetration Testing", "Metasploit", "Nmap", "Burp Suite", "Wireshark",
    "OWASP ZAP", "Kali Linux", "Security Automation", "Threat Analysis"
  ],
  "AI/ML": [
    "Python", "scikit-learn", "TensorFlow", "NLP", "LLMs",
    "Data Preprocessing", "Feature Engineering", "Model Optimization"
  ],
  "DevOps & Cloud": [
    "Docker", "Kubernetes", "Jenkins", "Terraform", "Git",
    "Oracle Cloud (OCI)", "CI/CD", "Infrastructure as Code"
  ],
  "Languages": [
    "Python", "C++", "JavaScript", "SQL", "Bash", "PowerShell"
  ]
};

const certifications = [
  { name: "Certified in Penetration Testing", issuer: "Cybertronium (Malaysia)", year: "2025" },
  { name: "CompTIA Security+", issuer: "Udemy", year: "2024" },
  { name: "Ethical Hacking", issuer: "Udemy", year: "2024" },
  { name: "Cyber Threat Management", issuer: "Cisco", year: "2024" },
  { name: "Cybersecurity Fundamentals", issuer: "IBM", year: "2024" },
  { name: "Cloud Infrastructure 2024 - Generative AI Certified Professional", issuer: "Oracle", year: "2024" },
  { name: "TCS iON Certification in Artificial Intelligence", issuer: "Tata Consultancy Services (TCS)", year: "2024" },
  { name: "Cybersecurity Program", issuer: "Infosys", year: "2024" },
  { name: "Python Programming", issuer: "FIIT", year: "2023" },
  { name: "Oracle Cloud Infrastructure Foundations Associate", issuer: "Oracle", year: "2025" },
  { name: "Oracle + Oracle Cloud Infrastructure AI Foundations Associate", issuer: "Oracle", year: "2025" },
  { name: "Oracle Data Platform Foundations Associate", issuer: "Oracle", year: "2025" }
];

const Experience = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getDisplayedSkills = () => {
    if (selectedCategory === "All") {
      return Object.values(skillCategories).flat().filter(Boolean);
    }
    return skillCategories[selectedCategory as keyof typeof skillCategories] || [];
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold glow-primary">The Blueprint</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Experience, skills, and certifications that define the architect
          </p>
        </div>

        {/* Work Experience Timeline */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
            <Building className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            Work Experience
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="glass p-4 sm:p-6 border-l-4 border-l-primary">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">{exp.role}</h3>
                    <p className="text-base sm:text-lg text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-foreground list-disc">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {Object.keys(skillCategories).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <Card className="glass p-6">
              <div className="flex flex-wrap gap-3">
                {getDisplayedSkills().map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-2 px-4 border-glow-primary"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Award className="w-8 h-8 text-secondary" />
            Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass p-6 border-glow-secondary">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <Badge variant="outline">{cert.year}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Award className="w-8 h-8 text-accent" />
            Achievements
          </h2>

          <Card className="glass p-8 space-y-4 border-glow-accent">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1 text-xl">•</span>
                <p className="text-foreground leading-relaxed">
                  Published a <span className="font-semibold text-accent">Scopus-indexed research paper</span> titled 
                  "AI-Powered Chrome Extension for Real-Time Detection of Phishing Attacks, Investment Scams, and Fake E-Commerce Websites."
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1 text-xl">•</span>
                <p className="text-foreground leading-relaxed">
                  Secured <span className="font-semibold text-accent">2nd place</span> in a department-level competition for 
                  developing a College ERP system, representing the department.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1 text-xl">•</span>
                <p className="text-foreground leading-relaxed">
                  Selected as a <span className="font-semibold text-accent">finalist</span> in a paper presentation competition 
                  at Vel Tech Multi Tech Engineering College.
                </p>
              </li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Experience;
