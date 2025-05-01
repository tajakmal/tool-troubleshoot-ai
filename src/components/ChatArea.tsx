import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '@/utils/mockData';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
interface ChatAreaProps {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  updateToolSpecs: (specKey: string | null) => void;
}
const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  addMessage,
  updateToolSpecs
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  return <div className="flex-1 flex flex-col bg-white">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-sbd-yellow rounded-full mb-4 flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
            <h2 className="text-xl font-montserrat font-bold text-sbd-charcoal mb-2">Ask</h2>
            <p className="text-sbd-midgray text-center max-w-md">
              Describe your tool issue, and I'll help diagnose the problem using our knowledge base.
            </p>
          </div> : messages.map(message => <ChatBubble key={message.id} message={message} />)}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Chat input */}
      <ChatInput addMessage={addMessage} updateToolSpecs={updateToolSpecs} />
    </div>;
};
export default ChatArea;