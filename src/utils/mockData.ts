
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface ToolSpecs {
  model: string;
  name: string;
  brand: string;
  type: string;
  power: string;
  weight: string;
  dimensions: string;
  warranty: string;
  manualLink: string;
  imageUrl: string;
}

export const brands: Brand[] = [
  { id: 'dewalt', name: 'DEWALT' },
  { id: 'craftsman', name: 'CRAFTSMAN' },
  { id: 'blackdecker', name: 'BLACK+DECKER' },
  { id: 'portercable', name: 'PORTER-CABLE' }
];

export const suggestedPrompts = [
  "Won't start",
  "Battery drains fast",
  "Error code E05"
];

export const toolSpecs: Record<string, ToolSpecs> = {
  'default': {
    model: '',
    name: 'Select a tool',
    brand: '',
    type: '',
    power: '',
    weight: '',
    dimensions: '',
    warranty: '',
    manualLink: '',
    imageUrl: ''
  },
  'drill': {
    model: 'DCD778',
    name: '20V MAX Brushless Compact Drill',
    brand: 'DEWALT',
    type: 'Cordless Drill',
    power: '20V',
    weight: '3.5 lbs',
    dimensions: '7.5" x 3.0" x 9.8"',
    warranty: '3 Year Limited',
    manualLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=500'
  }
};

export const initialMessages: ChatMessage[] = [];

export function formatTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function generateMockResponse(query: string): ChatMessage {
  let response = '';
  
  if (query.toLowerCase().includes('drill') && query.toLowerCase().includes('overheat')) {
    response = `The most common causes for overheating in your drill are:\n\n1. **Continuous operation at high loads** - The motor needs periodic cool-down periods during heavy use [**M-123 p.14**]\n\n2. **Blocked ventilation ports** - Ensure the side vents are clear of dust and debris [**DCD778-Manual p.8**]\n\n3. **Battery issues** - An aging battery can cause overheating. Try using a different battery pack to isolate the issue [**Service Guide p.22**]\n\n4. **Worn carbon brushes** - If your drill is older, worn brushes can cause increased heat production [**Maintenance Guide p.35**]`;
  } else if (query.toLowerCase().includes('battery') || query.toLowerCase().includes('charge')) {
    response = `Here are the most likely reasons for battery issues:\n\n1. **Improper charging practices** - Always fully discharge and charge batteries for optimal performance [**Battery Guide p.5**]\n\n2. **Temperature extremes** - Batteries should be charged and stored between 40°F-104°F (4°C-40°C) [**User Manual p.12**]\n\n3. **Age of battery** - Lithium-ion batteries typically last 2-3 years or 300-500 charge cycles [**B+D Specs p.7**]\n\n4. **Dirty battery contacts** - Clean the battery contacts with alcohol wipes to ensure good connection [**Maintenance Guide p.18**]`;
  } else if (query.toLowerCase().includes('won\'t start') || query.toLowerCase().includes('not starting')) {
    response = `If your tool won't start, try these troubleshooting steps:\n\n1. **Check the power source** - Ensure battery is charged or power cord is properly connected [**Quick Guide p.3**]\n\n2. **Inspect the trigger switch** - The trigger may have debris or damage preventing activation [**Service Manual p.45**]\n\n3. **Reset any circuit breakers** - Some tools have thermal protection that requires reset [**Safety Guide p.8**]\n\n4. **Check for mechanical binding** - Ensure the chuck and working parts move freely [**Troubleshooting Tips p.12**]`;
  } else {
    response = `Based on your question, here are some troubleshooting steps:\n\n1. **Consult your owner's manual** - Many common issues are addressed in the documentation that came with your tool [**General Guide p.4**]\n\n2. **Check for power/battery issues** - Many problems stem from power supply issues [**Power Guide p.7**]\n\n3. **Inspect for physical damage** - Look for broken components, loose parts, or worn brushes [**Visual Inspection p.10**]\n\n4. **Consider environmental factors** - Excessive dust, moisture, or heat can affect tool performance [**Operation Guide p.15**]`;
  }
  
  return {
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    content: response,
    timestamp: formatTimestamp()
  };
}

export function extractSpecs(query: string): string | null {
  if (query.toLowerCase().includes('drill')) {
    return 'drill';
  }
  return null;
}
