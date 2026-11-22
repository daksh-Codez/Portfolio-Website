import React from 'react';
import { getSectionLabel } from '../../config/sections';

interface SectionLabelProps {
  id: string;
  className?: string;
  name?: string;
  style?: React.CSSProperties;
}

/**
 * Renders the dynamically numbered section label (e.g. "03 / PROBLEM SOLVING")
 * driven by the centralized section configuration in src/config/sections.ts.
 */
export const SectionLabel: React.FC<SectionLabelProps> = ({
  id,
  className = '',
  name,
  style,
}) => {
  const label = getSectionLabel(id, name);

  return (
    <div className={`section-label ${className}`.trim()} style={style}>
      {label}
    </div>
  );
};
