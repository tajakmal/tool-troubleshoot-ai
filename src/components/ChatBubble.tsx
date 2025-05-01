
import React from 'react';
import { ChatMessage } from '@/utils/mockData';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  // Helper to format citations in markdown with styling
  const formatContent = (content: string): React.ReactNode => {
    // Pattern to match citations like [**M-123 p.14**]
    const citationPattern = /\[\*\*(.*?)\*\*\]/g;
    
    // Split by citations to process them
    const parts = content.split(citationPattern);
    const matches = content.match(citationPattern) || [];
    
    if (matches.length === 0) {
      return formatMarkdown(content);
    }
    
    const result: React.ReactNode[] = [];
    
    // Interleave text and citations
    parts.forEach((part, index) => {
      if (index > 0 && index <= matches.length) {
        const citation = matches[index - 1].replace(/\[\*\*|\*\*\]/g, '');
        result.push(
          <span 
            key={`citation-${index}`} 
            className="citation"
            onClick={() => handleCitationClick(citation)}
          >
            [{citation}]
          </span>
        );
      }
      
      if (part) {
        result.push(
          <span key={`text-${index}`}>
            {formatMarkdown(part)}
          </span>
        );
      }
    });
    
    return result;
  };

  // Handle clicking on a citation
  const handleCitationClick = (citation: string) => {
    alert(`Opening PDF for citation: ${citation}`);
    // In a real implementation, this would open a modal with the PDF viewer
  };

  // Basic markdown formatting
  const formatMarkdown = (text: string): React.ReactNode => {
    // Process bold text (**text**)
    const boldPattern = /\*\*(.*?)\*\*/g;
    const boldParts = text.split(boldPattern);
    
    if (!boldPattern.test(text)) {
      return processLineBreaks(text);
    }
    
    const result: React.ReactNode[] = [];
    
    boldParts.forEach((part, i) => {
      if (i % 2 === 0) {
        result.push(processLineBreaks(part));
      } else {
        result.push(<strong key={i}>{processLineBreaks(part)}</strong>);
      }
    });
    
    return result;
  };

  // Process line breaks for markdown
  const processLineBreaks = (text: string): React.ReactNode => {
    const parts = text.split('\n\n');
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < parts.length - 1 && <br />}
        {i < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
      <div 
        className={
          message.role === 'user' 
            ? 'chat-bubble-user' 
            : 'chat-bubble-assistant'
        }
      >
        {message.role === 'assistant' 
          ? formatContent(message.content)
          : message.content
        }
      </div>
      <div className="chat-timestamp">
        {message.timestamp}
      </div>
    </div>
  );
};

export default ChatBubble;
