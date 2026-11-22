import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProjectRecord, SkillRecord, PersonalInfoRecord, EducationRecordDB, TrajectoryItemRecord, SocialLinkRecord, MediaFileRecord } from '../types/database';
import { projects as fallbackProjects, Project } from '../data/projects';
import { skillGroups as fallbackSkillGroups, SkillGroup } from '../data/skills';
import { personalInfo as fallbackPersonalInfo, PersonalInfo } from '../data/personalInfo';
import { educationData as fallbackEducation, trajectoryItems as fallbackTrajectory, internshipMilestone as fallbackMilestone } from '../data/education';
import { socialLinks as fallbackSocialLinks, SocialLink } from '../data/socialLinks';

interface DataContextType {
  // Public data state
  projectsList: Project[];
  skillsList: SkillRecord[];
  skillGroupsList: SkillGroup[];
  personalInfoData: PersonalInfo;
  educationRecord: typeof fallbackEducation;
  trajectoryList: typeof fallbackTrajectory;
  milestoneData: typeof fallbackMilestone;
  socialLinksList: SocialLink[];
  isLoading: boolean;
  refreshData: () => Promise<void>;

  // Admin DB operations
  getAllAdminProjects: () => Promise<ProjectRecord[]>;
  saveProject: (project: Partial<ProjectRecord>) => Promise<{ data?: any; error?: any }>;
  deleteProject: (id: string) => Promise<{ error?: any }>;

  getAllAdminSkills: () => Promise<SkillRecord[]>;
  saveSkill: (skill: Partial<SkillRecord>) => Promise<{ data?: any; error?: any }>;
  deleteSkill: (id: string) => Promise<{ error?: any }>;

  getAdminPersonalInfo: () => Promise<PersonalInfoRecord | null>;
  savePersonalInfo: (info: Partial<PersonalInfoRecord>) => Promise<{ error?: any }>;

  getAdminEducation: () => Promise<EducationRecordDB | null>;
  saveEducation: (edu: Partial<EducationRecordDB>) => Promise<{ error?: any }>;

  getAllAdminTrajectory: () => Promise<TrajectoryItemRecord[]>;
  saveTrajectoryItem: (item: Partial<TrajectoryItemRecord>) => Promise<{ error?: any }>;
  deleteTrajectoryItem: (id: string) => Promise<{ error?: any }>;

  getAdminSocialLinks: () => Promise<SocialLinkRecord[]>;
  saveSocialLink: (link: Partial<SocialLinkRecord>) => Promise<{ error?: any }>;
  deleteSocialLink: (id: string) => Promise<{ error?: any }>;

  getAllMediaFiles: () => Promise<MediaFileRecord[]>;
  uploadMediaFile: (file: File) => Promise<{ data?: MediaFileRecord; error?: any }>;
  deleteMediaFile: (id: string, storagePath: string) => Promise<{ error?: any }>;
}

export const defaultSkillsList: SkillRecord[] = [
  { id: '1', name: 'C', category: '01 / PROGRAMMING & SYSTEMS', icon_name: 'Code2', display_order: 1, status: 'published' },
  { id: '2', name: 'C++', category: '01 / PROGRAMMING & SYSTEMS', icon_name: 'Cpu', display_order: 2, status: 'published' },
  { id: '3', name: 'Python', category: '01 / PROGRAMMING & SYSTEMS', icon_name: 'Terminal', display_order: 3, status: 'published' },
  { id: '4', name: 'HTML', category: '02 / WEB FOUNDATIONS', icon_name: 'Globe', display_order: 4, status: 'published' },
  { id: '5', name: 'CSS', category: '02 / WEB FOUNDATIONS', icon_name: 'Layers', display_order: 5, status: 'published' },
  { id: '6', name: 'JavaScript', category: '02 / WEB FOUNDATIONS', icon_name: 'Code', display_order: 6, status: 'published' },
  { id: '7', name: 'SQL', category: '03 / DATABASE', icon_name: 'Database', display_order: 7, status: 'published' },
  { id: '8', name: 'Git', category: '04 / DEVELOPMENT WORKFLOW', icon_name: 'GitBranch', display_order: 8, status: 'published' },
  { id: '9', name: 'GitHub', category: '04 / DEVELOPMENT WORKFLOW', icon_name: 'Github', display_order: 9, status: 'published' },
  { id: '10', name: 'Visual Studio Code', category: '04 / DEVELOPMENT WORKFLOW', icon_name: 'Monitor', display_order: 10, status: 'published' },
];

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectsList, setProjectsList] = useState<Project[]>(fallbackProjects);
  const [skillsList, setSkillsList] = useState<SkillRecord[]>(defaultSkillsList);
  const [skillGroupsList, setSkillGroupsList] = useState<SkillGroup[]>(fallbackSkillGroups);
  const [personalInfoData, setPersonalInfoData] = useState<PersonalInfo>(fallbackPersonalInfo);
  const [educationRecord, setEducationRecord] = useState(fallbackEducation);
  const [trajectoryList, setTrajectoryList] = useState(fallbackTrajectory);
  const [milestoneData, setMilestoneData] = useState(fallbackMilestone);
  const [socialLinksList, setSocialLinksList] = useState<SocialLink[]>(fallbackSocialLinks);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  const fetchPublicData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    try {
      // 1. Fetch published projects
      const { data: dbProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (dbProjects && dbProjects.length > 0) {
        const mapped: Project[] = dbProjects.map((p) => ({
          id: p.slug || p.id,
          number: p.number,
          title: p.title,
          language: p.language,
          technologies: p.technologies || [],
          category: p.category,
          description: p.short_description,
          highlights: p.highlights || [],
          githubUrl: p.github_url || undefined,
          sourceFileName: p.source_file_name,
          startLine: p.start_line || 1,
          codeExcerpt: p.code_excerpt,
          visualAccent: p.visual_accent || '#8B5CF6',
        }));
        setProjectsList(mapped);
      }

      // 2. Fetch personal info
      const { data: dbPersonal } = await supabase
        .from('personal_info')
        .select('*')
        .eq('id', 1)
        .single();

      if (dbPersonal) {
        setPersonalInfoData((prev) => ({
          ...prev,
          name: dbPersonal.name || prev.name,
          role: dbPersonal.role || prev.role,
          tagline: dbPersonal.tagline || prev.tagline,
          location: dbPersonal.location || prev.location,
          email: dbPersonal.email !== undefined ? dbPersonal.email : prev.email,
          heroHeadline: dbPersonal.headline || prev.heroHeadline,
          heroBio:
            dbPersonal.bio &&
            dbPersonal.bio !==
              'I am a Computer Science Engineering student focused on programming fundamentals, low-level systems, software craftsmanship, and real-world digital applications.' &&
            dbPersonal.bio !==
              "I'm Daksh Goswami, a CSE student interested in competitive programming and software development. I'm skilled in C, C++, and Python, and always learning, building projects, and improving my problem-solving skills."
              ? dbPersonal.bio
              : prev.heroBio,
          aboutEditorial: {
            ...prev.aboutEditorial,
            lead: dbPersonal.headline || prev.aboutEditorial.lead,
            paragraphs: dbPersonal.about_paragraphs && dbPersonal.about_paragraphs.length > 0
              ? dbPersonal.about_paragraphs
              : prev.aboutEditorial.paragraphs,
          },
        }));
      }

      // 3. Fetch education
      const { data: dbEdu } = await supabase
        .from('education')
        .select('*')
        .eq('id', 1)
        .single();

      if (dbEdu) {
        setEducationRecord({
          institution: dbEdu.institution,
          degree: dbEdu.degree,
          major: dbEdu.major,
          status: dbEdu.status,
          location: dbEdu.location,
          academicNotes: dbEdu.academic_notes || fallbackEducation.academicNotes,
        });
      }

      // 4. Fetch trajectory items
      const { data: dbTrajectory } = await supabase
        .from('trajectory_items')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (dbTrajectory && dbTrajectory.length > 0) {
        setTrajectoryList(
          dbTrajectory.map((t) => ({
            number: t.number,
            title: t.title,
            phase: t.phase,
            type: t.type,
            description: t.description,
            tags: t.tags || [],
          }))
        );
      }

      // 5. Fetch milestone
      const { data: dbMilestone } = await supabase
        .from('internship_milestone')
        .select('*')
        .eq('id', 1)
        .single();

      if (dbMilestone) {
        setMilestoneData({
          eyebrow: dbMilestone.eyebrow,
          title: dbMilestone.title,
          description: dbMilestone.description,
          badge: dbMilestone.badge,
        });
      }

      // 6. Fetch social links
      const { data: dbSocial } = await supabase
        .from('social_links')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (dbSocial && dbSocial.length > 0) {
        setSocialLinksList(
          dbSocial.map((s) => ({
            id: s.id,
            label: s.platform,
            handle: s.handle,
            url: s.url,
            isConfigured: Boolean(s.url),
            platform: s.platform || s.id,
          }))
        );
      }

      // 7. Fetch published skills
      const { data: dbSkills } = await supabase
        .from('skills')
        .select('*')
        .eq('status', 'published')
        .order('display_order', { ascending: true });

      if (dbSkills && dbSkills.length > 0) {
        setSkillsList(dbSkills);
      }
    } catch (err) {
      console.warn('Supabase fetch encountered an issue, preserving fallback portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicData();
  }, [fetchPublicData]);

  // ========================================================
  // ADMIN CRUD OPERATIONS
  // ========================================================

  const getAllAdminProjects = async (): Promise<ProjectRecord[]> => {
    if (!isSupabaseConfigured) {
      return fallbackProjects.map((p, idx) => ({
        id: p.id,
        slug: p.id,
        number: p.number,
        title: p.title,
        language: p.language,
        category: p.category,
        short_description: p.description,
        detailed_description: p.description,
        technologies: p.technologies,
        highlights: p.highlights,
        github_url: p.githubUrl,
        source_file_name: p.sourceFileName,
        start_line: p.startLine,
        code_excerpt: p.codeExcerpt,
        visual_accent: p.visualAccent,
        display_order: idx + 1,
        status: 'published' as const,
      }));
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const saveProject = async (project: Partial<ProjectRecord>) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured. Add environment variables to save.') };
    }

    if (project.id) {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...project,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id)
        .select()
        .single();
      await fetchPublicData();
      return { data, error };
    } else {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...project,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();
      await fetchPublicData();
      return { data, error };
    }
  };

  const deleteProject = async (id: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured.') };
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    await fetchPublicData();
    return { error };
  };

  const getAllAdminSkills = async (): Promise<SkillRecord[]> => {
    if (!isSupabaseConfigured) {
      return skillsList;
    }

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const saveSkill = async (skill: Partial<SkillRecord>) => {
    if (!isSupabaseConfigured) {
      if (skill.id) {
        setSkillsList((prev) =>
          prev.map((s) => (s.id === skill.id ? ({ ...s, ...skill } as SkillRecord) : s))
        );
      } else {
        const newRecord: SkillRecord = {
          id: `skill-${Date.now()}`,
          name: skill.name || '',
          category: (skill.category as any) || '01 / PROGRAMMING & SYSTEMS',
          icon_name: skill.icon_name || 'Code2',
          display_order: skill.display_order || skillsList.length + 1,
          status: skill.status || 'published',
        };
        setSkillsList((prev) => [...prev, newRecord]);
      }
      return { data: skill };
    }

    if (skill.id) {
      const { data, error } = await supabase
        .from('skills')
        .update({ ...skill, updated_at: new Date().toISOString() })
        .eq('id', skill.id)
        .select()
        .single();
      await fetchPublicData();
      return { data, error };
    } else {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ ...skill, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
        .select()
        .single();
      await fetchPublicData();
      return { data, error };
    }
  };

  const deleteSkill = async (id: string) => {
    if (!isSupabaseConfigured) {
      setSkillsList((prev) => prev.filter((s) => s.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from('skills').delete().eq('id', id);
    await fetchPublicData();
    return { error };
  };

  const getAdminPersonalInfo = async (): Promise<PersonalInfoRecord | null> => {
    if (!isSupabaseConfigured) {
      return {
        id: 1,
        name: fallbackPersonalInfo.name,
        role: fallbackPersonalInfo.role,
        tagline: fallbackPersonalInfo.tagline,
        headline: fallbackPersonalInfo.aboutEditorial.lead,
        location: fallbackPersonalInfo.location,
        bio: fallbackPersonalInfo.heroBio,
        about_paragraphs: fallbackPersonalInfo.aboutEditorial.paragraphs,
        email: 'dakshgoswami4077@gmail.com',
        availability_status: 'Open to Internship Opportunities',
      };
    }

    const { data, error } = await supabase.from('personal_info').select('*').eq('id', 1).single();
    if (error) throw error;
    return data;
  };

  const savePersonalInfo = async (info: Partial<PersonalInfoRecord>) => {
    if (!isSupabaseConfigured) {
      setPersonalInfoData((prev) => ({
        ...prev,
        name: info.name ?? prev.name,
        role: info.role ?? prev.role,
        tagline: info.tagline ?? prev.tagline,
        location: info.location ?? prev.location,
        email: info.email !== undefined ? info.email : prev.email,
        heroHeadline: info.headline ?? prev.heroHeadline,
        heroBio: info.bio ?? prev.heroBio,
      }));
      return { error: null };
    }
    const { error } = await supabase
      .from('personal_info')
      .upsert({ ...info, id: 1, updated_at: new Date().toISOString() });
    await fetchPublicData();
    return { error };
  };

  const getAdminEducation = async (): Promise<EducationRecordDB | null> => {
    if (!isSupabaseConfigured) {
      return {
        id: 1,
        institution: fallbackEducation.institution,
        degree: fallbackEducation.degree,
        major: fallbackEducation.major,
        status: fallbackEducation.status,
        location: fallbackEducation.location,
        academic_notes: fallbackEducation.academicNotes,
      };
    }

    const { data, error } = await supabase.from('education').select('*').eq('id', 1).single();
    if (error) throw error;
    return data;
  };

  const saveEducation = async (edu: Partial<EducationRecordDB>) => {
    if (!isSupabaseConfigured) return { error: new Error('Supabase is not configured.') };
    const { error } = await supabase
      .from('education')
      .upsert({ ...edu, id: 1, updated_at: new Date().toISOString() });
    await fetchPublicData();
    return { error };
  };

  const getAllAdminTrajectory = async (): Promise<TrajectoryItemRecord[]> => {
    if (!isSupabaseConfigured) {
      return fallbackTrajectory.map((t, idx) => ({
        id: `trajectory-${idx}`,
        number: t.number,
        title: t.title,
        phase: t.phase,
        type: t.type,
        description: t.description,
        tags: t.tags,
        display_order: idx + 1,
        status: 'published' as const,
      }));
    }

    const { data, error } = await supabase
      .from('trajectory_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const saveTrajectoryItem = async (item: Partial<TrajectoryItemRecord>) => {
    if (!isSupabaseConfigured) return { error: new Error('Supabase is not configured.') };
    if (item.id && !item.id.startsWith('trajectory-')) {
      const { error } = await supabase
        .from('trajectory_items')
        .update({ ...item, updated_at: new Date().toISOString() })
        .eq('id', item.id);
      await fetchPublicData();
      return { error };
    } else {
      const { id, ...rest } = item;
      const { error } = await supabase
        .from('trajectory_items')
        .insert([{ ...rest, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
      await fetchPublicData();
      return { error };
    }
  };

  const deleteTrajectoryItem = async (id: string) => {
    if (!isSupabaseConfigured) return { error: new Error('Supabase is not configured.') };
    const { error } = await supabase.from('trajectory_items').delete().eq('id', id);
    await fetchPublicData();
    return { error };
  };

  const getAdminSocialLinks = async (): Promise<SocialLinkRecord[]> => {
    if (!isSupabaseConfigured) {
      return fallbackSocialLinks.map((s, idx) => ({
        id: s.id,
        platform: s.label,
        url: s.url || '',
        handle: s.handle,
        display_order: idx + 1,
        status: 'published' as const,
      }));
    }

    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  };

  const saveSocialLink = async (link: Partial<SocialLinkRecord>) => {
    if (!isSupabaseConfigured) {
      if (link.id) {
        setSocialLinksList((prev) => {
          const exists = prev.some((s) => s.id === link.id);
          if (exists) {
            return prev.map((s) =>
              s.id === link.id
                ? {
                    ...s,
                    label: link.platform || s.label,
                    handle: link.handle || s.handle,
                    url: link.url || s.url,
                    platform: link.platform || s.platform,
                    isConfigured: Boolean(link.url),
                  }
                : s
            );
          }
          return [
            ...prev,
            {
              id: link.id!,
              label: link.platform || '',
              handle: link.handle || '',
              url: link.url || '',
              isConfigured: Boolean(link.url),
              platform: link.platform || link.id!,
            },
          ];
        });
      }
      return { error: null };
    }
    const { error } = await supabase
      .from('social_links')
      .upsert({ ...link, updated_at: new Date().toISOString() });
    await fetchPublicData();
    return { error };
  };

  const deleteSocialLink = async (id: string) => {
    if (!isSupabaseConfigured) {
      setSocialLinksList((prev) => prev.filter((s) => s.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    await fetchPublicData();
    return { error };
  };

  const getAllMediaFiles = async (): Promise<MediaFileRecord[]> => {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  };

  const uploadMediaFile = async (file: File): Promise<{ data?: MediaFileRecord; error?: any }> => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase Storage is not configured. Add environment variables to upload.') };
    }

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `uploads/${Date.now()}_${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      const { data: record, error: dbError } = await supabase
        .from('media_files')
        .insert([{
          filename: file.name,
          storage_path: filePath,
          public_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (dbError) throw dbError;
      return { data: record };
    } catch (err) {
      return { error: err };
    }
  };

  const deleteMediaFile = async (id: string, storagePath: string) => {
    if (!isSupabaseConfigured) return { error: new Error('Supabase is not configured.') };
    try {
      await supabase.storage.from('portfolio-media').remove([storagePath]);
      const { error } = await supabase.from('media_files').delete().eq('id', id);
      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <DataContext.Provider
      value={{
        projectsList,
        skillsList,
        skillGroupsList,
        personalInfoData,
        educationRecord,
        trajectoryList,
        milestoneData,
        socialLinksList,
        isLoading,
        refreshData: fetchPublicData,

        getAllAdminProjects,
        saveProject,
        deleteProject,

        getAllAdminSkills,
        saveSkill,
        deleteSkill,

        getAdminPersonalInfo,
        savePersonalInfo,

        getAdminEducation,
        saveEducation,

        getAllAdminTrajectory,
        saveTrajectoryItem,
        deleteTrajectoryItem,

        getAdminSocialLinks,
        saveSocialLink,
        deleteSocialLink,

        getAllMediaFiles,
        uploadMediaFile,
        deleteMediaFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(DataContext);
