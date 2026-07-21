
-- Roll back the previous restrictive policy setup and use column-level privileges.
DROP POLICY IF EXISTS "Public can view photos via sanitized view" ON public.photos;
DROP POLICY IF EXISTS "Admins can view all photos" ON public.photos;
DROP VIEW IF EXISTS public.photos_public;

-- Restore the public read policy (row-level: all rows visible).
CREATE POLICY "Photos are viewable by everyone"
ON public.photos
FOR SELECT
TO anon, authenticated
USING (true);

-- Ensure baseline table grants exist.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photos TO authenticated;
GRANT SELECT ON public.photos TO anon;
GRANT ALL ON public.photos TO service_role;

-- Column-level privacy: strip SELECT on sensitive columns from public roles.
REVOKE SELECT (user_id, metadata) ON public.photos FROM anon;
REVOKE SELECT (user_id, metadata) ON public.photos FROM authenticated;

-- Re-grant SELECT on the remaining (safe) columns explicitly so that
-- `select *` and column-specific reads continue to work for public roles.
GRANT SELECT
  (id, title, description, caption, story, category,
   image_url, thumbnail_url, tags, display_order, is_featured,
   created_at, updated_at)
ON public.photos TO anon, authenticated;
