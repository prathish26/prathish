-- Create photos table for gallery management
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  caption TEXT,
  story TEXT,
  category TEXT NOT NULL CHECK (category IN ('cinematography', 'wildlife')),
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Public can view all photos
CREATE POLICY "Photos are viewable by everyone" 
ON public.photos 
FOR SELECT 
USING (true);

-- Only authenticated users can insert photos
CREATE POLICY "Authenticated users can insert photos" 
ON public.photos 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own photos
CREATE POLICY "Users can update their own photos" 
ON public.photos 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own photos
CREATE POLICY "Users can delete their own photos" 
ON public.photos 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_photos_updated_at
BEFORE UPDATE ON public.photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- Storage policies for gallery bucket
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'gallery' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own gallery images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'gallery' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own gallery images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'gallery' 
  AND auth.role() = 'authenticated'
);

-- Create index for better performance
CREATE INDEX idx_photos_category ON public.photos(category);
CREATE INDEX idx_photos_created_at ON public.photos(created_at DESC);
CREATE INDEX idx_photos_display_order ON public.photos(display_order);
CREATE INDEX idx_photos_tags ON public.photos USING GIN(tags);