import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Award } from "lucide-react";

const experiences = [
  {
    role: "Cybersecurity Intern",
    company: "IITM Pravartak Technologies Foundation (IIT Madras)",
    period: "July 2024 - Present",
    achievements: [
      "Developed an AI-powered phishing detection system achieving 98.7% accuracy",
      "Implemented advanced ML algorithms for URL analysis and threat classification",
      "Collaborated with research team on cybersecurity automation projects"
    ]
  },
  {
    role: "Machine Learning Intern",
    company: "Appinventiv Technologies",
    period: "May 2024 - June 2024",
    achievements: [
      "Built and deployed ML models for predictive analytics",
      "Optimized model performance through feature engineering and hyperparameter tuning",
      "Integrated ML solutions into production applications"
    ]
  },
  {
    role: "DevOps Intern",
    company: "CloudThat Technologies",
    period: "March 2024 - April 2024",
    achievements: [
      "Designed and implemented CI/CD pipelines using Jenkins and Docker",
      "Automated infrastructure deployment using Terraform and Kubernetes",
      "Improved deployment efficiency by 40% through automation"
    ]
  },
  {
    role: "Cybersecurity Intern",
    company: "Data Knight India",
    period: "January 2024 - February 2024",
    achievements: [
      "Conducted vulnerability assessments and penetration testing",
      "Developed automated security scanning tools",
      "Created comprehensive security reports and remediation strategies"
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
  { name: "CompTIA Security+", issuer: "CompTIA", year: "2024" },
  { name: "IBM Cybersecurity Analyst", issuer: "IBM", year: "2024" },
  { name: "Oracle Cloud Infrastructure", issuer: "Oracle", year: "2023" },
  { name: "Ethical Hacking Essentials", issuer: "EC-Council", year: "2023" }
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
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold glow-primary">The Blueprint</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience, skills, and certifications that define the architect
          </p>
        </div>

        {/* Work Experience Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Building className="w-8 h-8 text-primary" />
            Work Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="glass p-6 border-l-4 border-l-primary">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-lg text-muted-foreground">{exp.company}</p>
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
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Award className="w-8 h-8 text-secondary" />
            Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass p-6 border-glow-secondary">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                  <Badge variant="outline">{cert.year}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
