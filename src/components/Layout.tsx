
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import SpecsPanel from './SpecsPanel';
import { Brand, ChatMessage, ToolSpecs, toolSpecs as mockToolSpecs, initialMessages } from '@/utils/mockData';

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [modelNumber, setModelNumber] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [currentSpecs, setCurrentSpecs] = useState<ToolSpecs>(mockToolSpecs['default']);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brandId)) {
        return prev.filter(id => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
  };

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const updateToolSpecs = (specKey: string | null) => {
    if (specKey && mockToolSpecs[specKey]) {
      setCurrentSpecs(mockToolSpecs[specKey]);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleCollapse={toggleSidebar}
        selectedBrands={selectedBrands}
        onBrandSelect={handleBrandSelect}
        modelNumber={modelNumber}
        setModelNumber={setModelNumber}
      />

      {/* Main content */}
      <main className={`flex-1 flex ${isSidebarCollapsed ? 'ml-16' : 'ml-0'} transition-all duration-300`}>
        {/* Chat area */}
        <ChatArea 
          messages={messages} 
          addMessage={addMessage} 
          updateToolSpecs={updateToolSpecs}
        />

        {/* Specs panel */}
        <SpecsPanel specs={currentSpecs} />
      </main>
    </div>
  );
};

export default Layout;
