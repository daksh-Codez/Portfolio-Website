-- ========================================================
-- COMPREHENSIVE SECURITY MIGRATION: HARDEN ADMIN RLS
-- Target Administrator UID: 8d3d305e-2243-4e22-a21f-fdbfd586645c
-- Safe to re-run multiple times (Fully Idempotent)
-- ========================================================

-- STEP 1: ENSURE DEDICATED ADMIN TABLE EXISTS & HAS RLS
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Explicitly ensure RLS is enabled on ALL 10 tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trajectory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_milestone ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- STEP 2: REGISTER AUTHORIZED ADMIN USER ID (Idempotent)
INSERT INTO public.admin_users (user_id)
VALUES ('8d3d305e-2243-4e22-a21f-fdbfd586645c'::uuid)
ON CONFLICT (user_id) DO NOTHING;

-- STEP 3: CREATE SECURE FUNCTION is_admin() (Idempotent)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

-- Grant execution permission to all roles
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

-- ========================================================
-- STEP 4: ATOMIC PURGE OF ALL EXISTING/LEGACY POLICIES
-- Scoped strictly to the 10 portfolio tables and portfolio-media bucket
-- ========================================================

DO $$
DECLARE
    r RECORD;
BEGIN
    -- Purge all policies across all 10 public tables
    FOR r IN (
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename IN (
            'projects',
            'skills',
            'personal_info',
            'education',
            'trajectory_items',
            'internship_milestone',
            'social_links',
            'media_files',
            'website_settings',
            'admin_users'
          )
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', r.policyname, r.schemaname, r.tablename);
    END LOOP;

    -- Purge ONLY portfolio-media policies on storage.objects (leaves other buckets untouched)
    FOR r IN (
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND (policyname ILIKE '%portfolio media%' OR policyname ILIKE '%portfolio-media%')
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- ========================================================
-- STEP 5: RE-ESTABLISH STRICT LEAST-PRIVILEGE POLICIES
-- ========================================================

-- 1. admin_users (Read own row only, mutations impossible via API)
CREATE POLICY "Admins can view own admin row"
    ON public.admin_users FOR SELECT
    USING (auth.uid() = user_id);

-- 2. projects (Public read published only; Admin CRUD & draft read)
CREATE POLICY "Public read published projects"
    ON public.projects FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin insert projects"
    ON public.projects FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin update projects"
    ON public.projects FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin delete projects"
    ON public.projects FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- 3. skills
CREATE POLICY "Public read published skills"
    ON public.skills FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin manage skills"
    ON public.skills FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 4. personal_info (Singleton)
CREATE POLICY "Public read personal_info"
    ON public.personal_info FOR SELECT
    USING (true);

CREATE POLICY "Admin manage personal_info"
    ON public.personal_info FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 5. education (Singleton)
CREATE POLICY "Public read education"
    ON public.education FOR SELECT
    USING (true);

CREATE POLICY "Admin manage education"
    ON public.education FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 6. trajectory_items
CREATE POLICY "Public read published trajectory"
    ON public.trajectory_items FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin manage trajectory"
    ON public.trajectory_items FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 7. internship_milestone (Singleton)
CREATE POLICY "Public read internship_milestone"
    ON public.internship_milestone FOR SELECT
    USING (true);

CREATE POLICY "Admin manage internship_milestone"
    ON public.internship_milestone FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 8. social_links
CREATE POLICY "Public read published social_links"
    ON public.social_links FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin manage social_links"
    ON public.social_links FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 9. media_files (Metadata)
CREATE POLICY "Public read media_files"
    ON public.media_files FOR SELECT
    USING (true);

CREATE POLICY "Admin manage media_files"
    ON public.media_files FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 10. website_settings
CREATE POLICY "Public read website_settings"
    ON public.website_settings FOR SELECT
    USING (true);

CREATE POLICY "Admin manage website_settings"
    ON public.website_settings FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ========================================================
-- STEP 6: STORAGE BUCKET POLICIES (portfolio-media)
-- ========================================================

-- Ensure bucket exists and is public for image display
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public can view/download media assets
CREATE POLICY "Public read portfolio-media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-media');

-- Only authorized admin can upload
CREATE POLICY "Admin upload portfolio-media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

-- Only authorized admin can update/overwrite
CREATE POLICY "Admin update portfolio-media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'portfolio-media' AND public.is_admin())
    WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

-- Only authorized admin can delete media
CREATE POLICY "Admin delete portfolio-media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'portfolio-media' AND public.is_admin());
