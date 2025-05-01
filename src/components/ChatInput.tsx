
import React, { useState } from 'react';
import { ChatMessage, formatTimestamp, generateMockResponse, suggestedPrompts, extractSpecs } from '@/utils/mockData';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  addMessage: (message: ChatMessage) => void;
  updateToolSpecs: (specKey: string | null) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ addMessage, updateToolSpecs }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Create user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: formatTimestamp()
    };
    
    // Add user message to chat
    addMessage(userMessage);
    
    // Clear input
    setInputValue('');
    
    // Set loading state
    setIsLoading(true);
    
    // Extract potential tool specs from the query
    const specKey = extractSpecs(inputValue);
    if (specKey) {
      updateToolSpecs(specKey);
    }
    
    // Simulate AI response delay
    setTimeout(() => {
      // Generate mock response
      const aiResponse = generateMockResponse(inputValue);
      
      // Add AI response to chat
      addMessage(aiResponse);
      
      // Clear loading state
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-sbd-lightgray p-4">
      {/* Suggested prompts - shown when input is empty */}
      {!inputValue && !isLoading && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the problem, e.g. '18 V drill overheats'..."
          className="flex-1 p-3 border border-sbd-midgray/30 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-sbd-yellow/50"
          rows={Math.min(3, Math.max(1, inputValue.split('\n').length))}
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="bg-sbd-yellow hover:bg-sbd-yellow/80 text-sbd-charcoal font-montserrat"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? 'Diagnosing...' : 'Submit'}
        </Button>
      </form>

      {/* Loading indicator */}
      {isLoading && (
        <div className="typing-indicator mt-2">
          <div className="typing-dot animate-typing-dot-1"></div>
          <div className="typing-dot animate-typing-dot-2"></div>
          <div className="typing-dot animate-typing-dot-3"></div>
          <span className="text-xs text-sbd-midgray ml-2">Analyzing manual data...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
