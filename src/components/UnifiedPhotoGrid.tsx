import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface Photo {
  id: string;
  title: string;
  description: string | null;
  caption: string | null;
  story: string | null;
  category: string;
  image_url: string;
  tags: string[];
  is_featured: boolean;
  display_order: number;
}

interface UnifiedPhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  loading: boolean;
}

export default function UnifiedPhotoGrid({ photos, onPhotoClick, loading }: UnifiedPhotoGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="relative">
        <div className="grid grid-cols-12 gap-3 auto-rows-[120px]">
          {[...Array(12)].map((_, i) => (
            <Skeleton 
              key={i} 
              className={`
                ${i % 7 === 0 ? 'col-span-6 row-span-3' : ''}
                ${i % 5 === 0 && i % 7 !== 0 ? 'col-span-4 row-span-2' : ''}
                ${i % 3 === 0 && i % 5 !== 0 && i % 7 !== 0 ? 'col-span-3 row-span-2' : ''}
                ${i % 2 === 0 && i % 3 !== 0 && i % 5 !== 0 && i % 7 !== 0 ? 'col-span-4 row-span-1' : ''}
                ${i % 2 !== 0 && i % 3 !== 0 && i % 5 !== 0 && i % 7 !== 0 ? 'col-span-3 row-span-1' : ''}
                rounded-2xl
              `}
            />
          ))}
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No photos yet. Begin your visual journey.</p>
      </div>
    );
  }

  // Organic bento-style grid with asymmetric layouts
  return (
    <div className="relative">
      {/* Hero featured section with parallax effect */}
      {photos.filter(p => p.is_featured).slice(0, 1).map((photo) => (
        <div 
          key={photo.id}
          className="relative mb-8 h-[70vh] group cursor-pointer overflow-hidden rounded-3xl"
          onClick={() => onPhotoClick(photo)}
          onMouseEnter={() => setHoveredId(photo.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="absolute inset-0">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110"
              style={{
                transform: hoveredId === photo.id ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          </div>
          
          {/* Gradient overlay with animated reveal */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-700" />
          
          {/* Floating content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <div className="transform transition-all duration-700 group-hover:translate-y-0 translate-y-4">
              <div className="inline-block px-4 py-1.5 mb-4 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Featured Story</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                {photo.title}
              </h2>
              {photo.caption && (
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {photo.caption}
                </p>
              )}
            </div>
          </div>

          {/* Animated corner accents */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
      ))}

      {/* Dynamic bento grid - asymmetric and flowing */}
      <div className="grid grid-cols-12 gap-3 auto-rows-[140px]">
        {photos.filter(p => !p.is_featured).map((photo, index) => {
          // Create organic, varied sizing patterns
          const patterns = [
            'col-span-12 md:col-span-7 row-span-3', // Large horizontal
            'col-span-12 md:col-span-5 row-span-2', // Medium
            'col-span-6 md:col-span-4 row-span-2',  // Medium square
            'col-span-6 md:col-span-3 row-span-3',  // Tall
            'col-span-12 md:col-span-5 row-span-2', // Medium
            'col-span-6 md:col-span-4 row-span-2',  // Medium
            'col-span-6 md:col-span-3 row-span-1',  // Small
            'col-span-12 md:col-span-8 row-span-2', // Wide
            'col-span-6 md:col-span-4 row-span-3',  // Tall
            'col-span-6 md:col-span-4 row-span-2',  // Medium
          ];
          
          const pattern = patterns[index % patterns.length];
          const isCinema = photo.category === 'cinematography';
          
          return (
            <div
              key={photo.id}
              className={`
                ${pattern}
                relative group cursor-pointer overflow-hidden rounded-2xl
                transition-all duration-500 hover:scale-[1.02] hover:z-10
              `}
              onClick={() => onPhotoClick(photo)}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-all duration-[1.2s] ease-out"
                  style={{
                    transform: hoveredId === photo.id ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Category indicator */}
              <div className="absolute top-3 right-3 z-10">
                <div className={`
                  px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold uppercase tracking-wider
                  transition-all duration-300 opacity-0 group-hover:opacity-100
                  ${isCinema 
                    ? 'bg-primary/20 border border-primary/40 text-primary' 
                    : 'bg-secondary/20 border border-secondary/40 text-secondary'
                  }
                `}>
                  {isCinema ? '🎬 Cinema' : '🦁 Wildlife'}
                </div>
              </div>

              {/* Gradient overlay */}
              <div className={`
                absolute inset-0 transition-all duration-700
                ${isCinema 
                  ? 'bg-gradient-to-t from-background/95 via-primary/20 to-transparent' 
                  : 'bg-gradient-to-t from-background/95 via-secondary/20 to-transparent'
                }
                opacity-0 group-hover:opacity-100
              `} />

              {/* Content reveal */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <div className="transform transition-all duration-500 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-tight">
                    {photo.title}
                  </h3>
                  {photo.caption && (
                    <p className="text-sm text-muted-foreground line-clamp-2 transition-all duration-500 delay-75">
                      {photo.caption}
                    </p>
                  )}
                  {photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {photo.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-0.5 bg-background/50 backdrop-blur-sm rounded-full text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ambient glow effect */}
              <div className={`
                absolute -inset-1 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10
                ${isCinema 
                  ? 'bg-gradient-to-r from-primary/30 via-primary/20 to-transparent' 
                  : 'bg-gradient-to-r from-secondary/30 via-secondary/20 to-transparent'
                }
              `} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
