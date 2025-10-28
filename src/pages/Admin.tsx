import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, LogOut, Trash2, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";

const photoSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(1000).optional(),
  caption: z.string().trim().max(500).optional(),
  story: z.string().trim().max(2000).optional(),
  category: z.enum(["cinematography", "wildlife"]),
  tags: z.string().max(500).optional()
});

interface Photo {
  id: string;
  title: string;
  category: string;
  image_url: string;
  is_featured: boolean;
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [story, setStory] = useState("");
  const [category, setCategory] = useState<"cinematography" | "wildlife">("cinematography");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchPhotos();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from("photos")
      .select("id, title, category, image_url, is_featured")
      .order("created_at", { ascending: false });
    
    if (data) setPhotos(data);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user) return;

    setLoading(true);

    try {
      // Validate form data
      const validatedData = photoSchema.parse({
        title,
        description: description || undefined,
        caption: caption || undefined,
        story: story || undefined,
        category,
        tags: tags || undefined
      });

      // Upload image to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // Parse tags
      const tagsArray = validatedData.tags 
        ? validatedData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      // Insert photo record
      const { error: dbError } = await supabase
        .from('photos')
        .insert({
          user_id: user.id,
          title: validatedData.title,
          description: validatedData.description,
          caption: validatedData.caption,
          story: validatedData.story,
          category: validatedData.category,
          image_url: publicUrl,
          tags: tagsArray,
          is_featured: isFeatured
        });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Photo uploaded successfully"
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCaption("");
      setStory("");
      setTags("");
      setIsFeatured(false);
      setSelectedFile(null);
      setPreviewUrl("");
      fetchPhotos();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/gallery/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('gallery').remove([filePath]);
      }

      await supabase.from('photos').delete().eq('id', photoId);

      toast({
        title: "Deleted",
        description: "Photo deleted successfully"
      });

      fetchPhotos();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete photo",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Admin Panel</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Upload New Photo</CardTitle>
              <CardDescription>Add photos to your gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    required
                    disabled={loading}
                  />
                  {previewUrl && (
                    <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg mt-2" />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={(v: any) => setCategory(v)} disabled={loading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematography">Cinematography</SelectItem>
                      <SelectItem value="wildlife">Wildlife Photography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Photo title"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caption">Caption (Optional)</Label>
                  <Input
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Short caption"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Photo description"
                    rows={3}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Behind the Scenes (Optional)</Label>
                  <Textarea
                    id="story"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Tell the story behind this shot"
                    rows={3}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Separate with commas: nature, wildlife, portrait"
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                    disabled={loading}
                  />
                  <Label htmlFor="featured" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Featured Photo
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Photos</CardTitle>
              <CardDescription>View and delete existing photos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {photos.map((photo) => (
                  <div key={photo.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{photo.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{photo.category}</p>
                      {photo.is_featured && (
                        <span className="text-xs text-primary flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(photo.id, photo.image_url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
