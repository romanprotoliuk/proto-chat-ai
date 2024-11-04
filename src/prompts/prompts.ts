import { PromptType } from '@/types';

export const prompts: PromptType[] = [
  {
    icon: '/icons/email-icon.svg',
    title: 'Draft email',
    description: 'Generate email for any occasion you need.',
    promptMessage: 'I need help drafting an email for...',
  },
  {
    icon: '/icons/essay-icon.svg',
    title: 'Write an Essay',
    description: 'Generate essay for any occasion you need.',
    promptMessage: 'Can you help me write an essay about...',
  },
  {
    icon: '/icons/planning-icon.svg',
    title: 'Planning',
    description: 'Plan for any occasion, from holiday to family.',
    promptMessage: 'I need help planning...',
  },
  {
    icon: '/icons/assistant-icon.svg',
    title: 'Assistant',
    description: 'Become your personal assistant. Helping you.',
    promptMessage: 'I need assistance with...',
  },
];