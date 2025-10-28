import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Camera as CameraIcon } from "lucide-react";
import PhotoLightbox from "@/components/PhotoLightbox";
import CinematographyGrid from "@/components/CinematographyGrid";
import WildlifeGrid from "@/components/WildlifeGrid";

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
  const [cinematographyPhotos, setCinematographyPhotos] = useState<Photo[]>([]);
  const [wildlifePhotos, setWildlifePhotos] = useState<Photo[]>([]);
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
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;

      const cinema = data?.filter(p => p.category === "cinematography") || [];
      const wildlife = data?.filter(p => p.category === "wildlife") || [];

      setCinematographyPhotos(cinema);
      setWildlifePhotos(wildlife);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
            Visual Stories
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Capturing moments through the lens of cinematography and wildlife photography
          </p>
        </div>

        <Tabs defaultValue="cinematography" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="cinematography" className="gap-2">
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">Cinematography</span>
              <span className="sm:hidden">Cinema</span>
            </TabsTrigger>
            <TabsTrigger value="wildlife" className="gap-2">
              <CameraIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Wildlife Photography</span>
              <span className="sm:hidden">Wildlife</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cinematography" className="mt-0">
            <CinematographyGrid 
              photos={cinematographyPhotos} 
              onPhotoClick={setSelectedPhoto}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="wildlife" className="mt-0">
            <WildlifeGrid 
              photos={wildlifePhotos} 
              onPhotoClick={setSelectedPhoto}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
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
