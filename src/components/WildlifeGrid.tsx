import { Skeleton } from "@/components/ui/skeleton";

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

interface WildlifeGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  loading: boolean;
}

export default function WildlifeGrid({ photos, onPhotoClick, loading }: WildlifeGridProps) {
  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-full mb-4 aspect-[3/4] rounded-lg" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No wildlife photography yet.</p>
      </div>
    );
  }

  // Organic masonry layout inspired by nature
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {photos.map((photo, index) => {
        const isHighlight = photo.is_featured || index % 6 === 0;
        
        return (
          <div
            key={photo.id}
            className={`
              relative group cursor-pointer break-inside-avoid mb-4
              ${isHighlight ? 'ring-2 ring-primary/50 ring-offset-4 ring-offset-background' : ''}
              hover-scale
            `}
            onClick={() => onPhotoClick(photo)}
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="w-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Nature-inspired overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                {/* Leaf corner decoration */}
                <div className="absolute top-2 right-2 w-8 h-8">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary/40">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  <h3 className="text-lg font-bold text-foreground">{photo.title}</h3>
                  {photo.caption && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{photo.caption}</p>
                  )}
                  {isHighlight && (
                    <span className="inline-block mt-2 text-xs font-semibold text-primary uppercase tracking-wider">
                      Spotlight
                    </span>
                  )}
                </div>
              </div>

              {/* Ambient glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
