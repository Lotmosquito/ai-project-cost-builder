import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <Info
        className={`w-4 h-4 text-muted-foreground hover:text-primary cursor-help transition-colors ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 ai-tooltip text-xs rounded-md z-50">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover/95" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;