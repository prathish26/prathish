import { Link, useLocation } from "react-router-dom";
import { Code2 } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { path: "/", label: "Hub" },
    { path: "/projects", label: "Case Studies" },
    { path: "/experience", label: "Blueprint" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="glow-primary">Prathish Raj</span>
          </Link>
          
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
