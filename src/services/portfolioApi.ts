import api from './api';
import type {
  ProfileData,
  SkillsData,
  ProjectsData,
  ExperienceData,
  ContactPayload,
  ContactResponse,
  VisitorCount,
} from '@/types';

export const fetchProfile = async (): Promise<ProfileData> => {
  const { data } = await api.get<ProfileData>('/profile');
  return data;
};

export const fetchSkills = async (): Promise<SkillsData> => {
  const { data } = await api.get<SkillsData>('/skills');
  return data;
};

export const fetchProjects = async (params?: {
  category?: string;
  search?: string;
}): Promise<ProjectsData> => {
  const { data } = await api.get<ProjectsData>('/projects', { params });
  return data;
};

export const fetchExperience = async (): Promise<ExperienceData> => {
  const { data } = await api.get<ExperienceData>('/experience');
  return data;
};

export const submitContact = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const { data } = await api.post<ContactResponse>('/contact', payload);
  return data;
};

export const trackVisit = async (): Promise<VisitorCount> => {
  const { data } = await api.post<VisitorCount>('/analytics/visit');
  return data;
};

export const fetchVisitorCount = async (): Promise<VisitorCount> => {
  const { data } = await api.get<VisitorCount>('/analytics/visitors');
  return data;
};

export const trackProjectView = async (projectId: string): Promise<void> => {
  await api.post('/analytics/project-view', { projectId });
};

export const trackResumeDownload = async (): Promise<void> => {
  await api.post('/analytics/resume-download');
};

export const downloadCV = async (): Promise<void> => {
  await trackResumeDownload();
  window.open('/api/cv/download', '_blank');
};
