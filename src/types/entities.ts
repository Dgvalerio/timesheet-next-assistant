import {
  CategoryEntity,
  ClientWithProjectsWithCategories,
  ProjectWithCategories,
} from '@/types/firestore';

export type Client = ClientWithProjectsWithCategories;

export type Project = ProjectWithCategories;

export type Category = CategoryEntity;
