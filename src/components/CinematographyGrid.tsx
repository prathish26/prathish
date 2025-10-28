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

interface CinematographyGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  loading: boolean;
}

export default function CinematographyGrid({ photos, onPhotoClick, loading }: CinematographyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="aspect-video rounded-lg" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No cinematography work yet.</p>
      </div>
    );
  }

  // Film reel inspired layout with dynamic sizing
  return (
    <div className="relative">
      {/* Featured large display */}
      {photos.filter(p => p.is_featured).length > 0 && (
        <div className="mb-8 relative group cursor-pointer" onClick={() => onPhotoClick(photos.filter(p => p.is_featured)[0])}>
          <div className="aspect-video overflow-hidden rounded-xl border-2 border-primary/30 relative">
            <img
              src={photos.filter(p => p.is_featured)[0].image_url}
              alt={photos.filter(p => p.is_featured)[0].title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Featured</span>
                <h3 className="text-2xl font-bold text-foreground">{photos.filter(p => p.is_featured)[0].title}</h3>
                {photos.filter(p => p.is_featured)[0].caption && (
                  <p className="text-sm text-muted-foreground">{photos.filter(p => p.is_featured)[0].caption}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Film strip grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(250px,auto)]">
        {photos.filter(p => !p.is_featured).map((photo, index) => {
          // Create varied sizes for visual interest
          const isWide = index % 5 === 0;
          const isTall = index % 7 === 0;
          
          return (
            <div
              key={photo.id}
              className={`
                relative group cursor-pointer overflow-hidden rounded-lg
                ${isWide ? 'sm:col-span-2' : ''}
                ${isTall ? 'row-span-2' : ''}
                hover-scale
              `}
              onClick={() => onPhotoClick(photo)}
            >
              <div className="w-full h-full relative">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Film strip perforations effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-background/10 backdrop-blur-sm flex flex-col justify-around py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-primary/30 rounded-full mx-auto" />
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-background/10 backdrop-blur-sm flex flex-col justify-around py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-primary/30 rounded-full mx-auto" />
                  ))}
                </div>

                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-lg font-bold text-foreground mb-1">{photo.title}</h3>
                    {photo.caption && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{photo.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
