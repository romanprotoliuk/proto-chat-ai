import { prompts } from '@/prompts/prompts';
import PromptCard from '@/components/ui/prompt-card';

interface PromptGridProps {
  onPromptSelect: (promptMessage: string) => void;
}

export default function PromptGrid({ onPromptSelect }: PromptGridProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Choose a starting point
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.title}
            prompt={prompt}
            onClick={onPromptSelect}
          />
        ))}
      </div>
    </div>
  );
}