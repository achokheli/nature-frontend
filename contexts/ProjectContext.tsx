'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { projectsApi } from '@/lib/api/projects';
import { Project, ProjectContextType } from '@/types';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProject = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getById(id);
      setCurrentProject(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch project');
      console.error('Fetch project error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (project: Partial<Project>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.create(project);
      setProjects((prev) => [...prev, data]);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      console.error('Create project error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: string, project: Partial<Project>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.update(id, project);
      setProjects((prev) => prev.map((p) => (p.id === id || p._id === id ? data : p)));
      if (currentProject && (currentProject.id === id || currentProject._id === id)) {
        setCurrentProject(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
      console.error('Update project error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentProject]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await projectsApi.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      if (currentProject && (currentProject.id === id || currentProject._id === id)) {
        setCurrentProject(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
      console.error('Delete project error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentProject]);

  const value: ProjectContextType = {
    projects,
    currentProject,
    loading,
    error,
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
