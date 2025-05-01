import React from 'react';
import { brands } from '@/utils/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';
interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  selectedBrands: string[];
  onBrandSelect: (brandId: string) => void;
  modelNumber: string;
  setModelNumber: (value: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleCollapse,
  selectedBrands,
  onBrandSelect,
  modelNumber,
  setModelNumber
}) => {
  return <aside className={`bg-white border-r border-sbd-lightgray flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo area */}
      <div className="h-14 bg-sbd-yellow flex items-center justify-between px-4">
        {!isCollapsed && <div className="text-sbd-charcoal font-montserrat font-bold">
            <span>Customer Support</span>
          </div>}
        <button onClick={toggleCollapse} className="p-1 rounded-md hover:bg-sbd-yellow/70 transition-colors" aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto p-4">
        {!isCollapsed && <>
            <h3 className="text-sm font-montserrat font-bold mb-2 text-sbd-charcoal">Filter by Brand</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {brands.map(brand => <button key={brand.id} className={`brand-chip ${selectedBrands.includes(brand.id) ? 'brand-chip-selected' : 'brand-chip-unselected'}`} onClick={() => onBrandSelect(brand.id)}>
                  {brand.name}
                </button>)}
            </div>

            <h3 className="text-sm font-montserrat font-bold mb-2 text-sbd-charcoal">Model Number</h3>
            <input type="text" value={modelNumber} onChange={e => setModelNumber(e.target.value)} placeholder="e.g., DCD778" className="w-full p-2 border border-sbd-midgray/30 rounded-md focus:outline-none focus:ring-2 focus:ring-sbd-yellow/50" />
          </>}
      </div>

      {/* Logo for collapsed state */}
      {isCollapsed && <div className="flex-1 flex flex-col items-center pt-4">
          <div className="w-8 h-8 bg-sbd-yellow rounded-md mb-4 flex items-center justify-center">
            <span className="font-montserrat font-bold text-xs">TD</span>
          </div>
        </div>}
    </aside>;
};
export default Sidebar;