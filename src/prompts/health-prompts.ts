import { PromptType } from '@/types/health';

export const prompts: PromptType[] = [
  {
    title: 'Health Data Analysis',
    description: 'Interpret your health metrics and lab results.',
    promptMessage: 'I need help interpreting these health metrics:',
    category: 'health',
    requiresData: true
  },
  {
    title: 'Wellness Plan',
    description: 'Get personalized wellness recommendations.',
    promptMessage: 'Based on my health profile, help me create a wellness plan for:',
    category: 'health',
    requiresData: true
  },
  {
    title: 'Medical Terms',
    description: 'Understand medical terminology and lab results.',
    promptMessage: 'Can you explain these medical terms:',
    category: 'health',
    requiresData: false
  },
  {
    title: 'Analyze Health Data',
    description: 'Get insights about your health metrics.',
    promptMessage: 'Please analyze my health data and provide insights.',
    category: 'health',
    requiresData: true
  },
  {
    title: 'Health Recommendations',
    description: 'Get personalized health recommendations.',
    promptMessage: 'Based on my health data, what recommendations do you have?',
    category: 'health',
    requiresData: true
  },
];