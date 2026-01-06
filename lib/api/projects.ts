/**
 * Projects API
 * API endpoints for project management
 */

import api from './config';
import { Project, ApiResponse } from '@/types';

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<ApiResponse<Project[]>>('/projects');
    return response.data.data;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },

  create: async (project: Partial<Project>): Promise<Project> => {
    const response = await api.post<ApiResponse<Project>>('/projects', project);
    return response.data.data;
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await api.put<ApiResponse<Project>>(`/projects/${id}`, project);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  uploadDocument: async (id: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('document', file);
    await api.post(`/projects/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
