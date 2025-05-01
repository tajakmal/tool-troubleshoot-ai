
import React from 'react';
import { ToolSpecs } from '@/utils/mockData';
import SpecsCard from './SpecsCard';

interface SpecsPanelProps {
  specs: ToolSpecs;
}

const SpecsPanel: React.FC<SpecsPanelProps> = ({ specs }) => {
  const hasSpecs = specs.model !== '';

  return (
    <div className="w-64 border-l border-sbd-lightgray p-4 bg-white hidden lg:block">
      <h2 className="font-montserrat font-bold text-sbd-charcoal mb-4">
        Quick Specs
      </h2>

      {!hasSpecs ? (
        <div className="text-sbd-midgray text-sm">
          Tool specifications will appear here when a specific tool is detected in your query.
        </div>
      ) : (
        <SpecsCard specs={specs} />
      )}
    </div>
  );
};

export default SpecsPanel;
