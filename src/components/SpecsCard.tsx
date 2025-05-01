
import React from 'react';
import { ToolSpecs } from '@/utils/mockData';

interface SpecsCardProps {
  specs: ToolSpecs;
}

const SpecsCard: React.FC<SpecsCardProps> = ({ specs }) => {
  return (
    <div className="specs-card">
      <div className="p-3 pb-0">
        {specs.imageUrl && (
          <img 
            src={specs.imageUrl} 
            alt={specs.name}
            className="w-full h-auto object-cover rounded-md mb-3" 
          />
        )}
        <h3 className="font-montserrat font-bold text-sbd-charcoal">{specs.name}</h3>
        <p className="text-sbd-midgray text-sm mb-3">Model: {specs.model}</p>
      </div>

      <div className="specs-card-content space-y-3">
        <div className="specs-item">
          <div className="specs-item-label">Brand</div>
          <div className="specs-item-value">{specs.brand}</div>
        </div>

        <div className="specs-item">
          <div className="specs-item-label">Type</div>
          <div className="specs-item-value">{specs.type}</div>
        </div>

        <div className="specs-item">
          <div className="specs-item-label">Power</div>
          <div className="specs-item-value">{specs.power}</div>
        </div>

        <div className="specs-item">
          <div className="specs-item-label">Weight</div>
          <div className="specs-item-value">{specs.weight}</div>
        </div>

        {specs.manualLink && (
          <a 
            href={specs.manualLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-sbd-yellow hover:bg-sbd-yellow/80 transition-colors text-sbd-charcoal text-center py-2 rounded-md font-montserrat font-medium mt-3"
          >
            View Manual
          </a>
        )}
      </div>
    </div>
  );
};

export default SpecsCard;
