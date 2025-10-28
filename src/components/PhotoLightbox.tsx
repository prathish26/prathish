import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Photo {
  id: string;
  title: string;
  description: string | null;
  caption: string | null;
  story: string | null;
  category: string;
  image_url: string;
  tags: string[];
}

interface PhotoLightboxProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-foreground hover:bg-primary/20"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="h-full w-full flex items-center justify-center p-4 sm:p-8">
        <div 
          className="w-full h-full max-w-7xl flex flex-col lg:flex-row gap-6 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Info Section */}
          <div className="lg:w-96 space-y-4 overflow-y-auto lg:max-h-full">
            <div className="glass rounded-lg p-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                {photo.title}
              </h2>

              {photo.caption && (
                <p className="text-lg text-muted-foreground italic">
                  {photo.caption}
                </p>
              )}

              {photo.description && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Description
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              )}

              {photo.story && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider">
                    Behind the Scenes
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {photo.story}
                  </p>
                </div>
              )}

              {photo.tags && photo.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
