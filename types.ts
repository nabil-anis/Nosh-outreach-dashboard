
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
}

export enum Page {
  CaseStudies = 'case_studies',
  Demo = 'demo',
  Solutions = 'solutions',
  About = 'about'
}
