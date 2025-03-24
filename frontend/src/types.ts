export interface Idea {
  title: string;
  description?: string;
  categories?: string[];
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  categories: string[];
}

export interface PRDContent {
  html?: string;
  markdown?: string;
} 