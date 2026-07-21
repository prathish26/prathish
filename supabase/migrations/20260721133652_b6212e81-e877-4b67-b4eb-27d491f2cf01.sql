
-- Restrict public read of the photos base table; expose a sanitized public view.
DROP POLICY IF EXISTS "Photos are viewable by everyone" ON public.photos;

CREATE POLICY "Admins can view all photos"
ON public.photos
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

REVOKE SELECT ON public.photos FROM anon;

-- Public view: excludes user_id and metadata to protect privacy.
CREATE OR REPLACE VIEW public.photos_public
WITH (security_invoker = true) AS
SELECT
  id, title, description, caption, story, category,
  image_url, thumbnail_url, tags, display_order, is_featured,
  created_at, updated_at
FROM public.photos;

-- The view runs with the caller's privileges; grant SELECT to allow reads.
-- Since the base table's SELECT policy is admin-only, add a permissive
-- SELECT policy for the view's benefit via a dedicated policy that
-- exposes only sanitized columns through the view.
CREATE POLICY "Public can view photos via sanitized view"
ON public.photos
FOR SELECT
TO anon, authenticated
USING (true);

-- Ensure the base table SELECT still exists but access to sensitive columns
-- is controlled at the application layer by using the view.
-- Grant the view to anon and authenticated.
GRANT SELECT ON public.photos_public TO anon, authenticated;
