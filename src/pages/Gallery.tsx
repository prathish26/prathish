import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PhotoLightbox from "@/components/PhotoLightbox";
import UnifiedPhotoGrid from "@/components/UnifiedPhotoGrid";

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

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPhotos(data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in leading-tight">
            Visual Stories
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light italic">
            "Illuminating the unseen beauty of the world, one moment at a time."
          </p>
        </div>

        <UnifiedPhotoGrid 
          photos={photos} 
          onPhotoClick={setSelectedPhoto}
          loading={loading}
        />
      </div>

      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}
