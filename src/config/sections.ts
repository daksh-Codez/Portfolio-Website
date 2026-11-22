export interface PortfolioSection {
  id: string; // DOM element ID / navigation anchor (e.g. 'about', 'skills', 'problem-solving', 'work', etc.)
  name: string; // Canonical display name (e.g. 'ABOUT', 'CAPABILITIES', 'PROBLEM SOLVING', etc.)
  navLabel?: string; // Human-friendly label for navigation menus
  navHref?: string; // Anchor link href
}

/**
 * Single source of truth for portfolio section order.
 * Reordering, inserting, or removing sections here will automatically
 * recalculate the numerical identifiers across the entire portfolio.
 */
export const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  {
    id: 'about',
    name: 'ABOUT',
    navLabel: 'About',
    navHref: '#about',
  },
  {
    id: 'skills',
    name: 'CAPABILITIES',
    navLabel: 'Skills',
    navHref: '#skills',
  },
  {
    id: 'work',
    name: 'SELECTED WORK',
    navLabel: 'Work',
    navHref: '#work',
  },
  {
    id: 'problem-solving',
    name: 'PROBLEM SOLVING',
    navLabel: 'Problem Solving',
    navHref: '#problem-solving',
  },
  {
    id: 'education',
    name: 'EDUCATION',
    navLabel: 'Education',
    navHref: '#education',
  },
  {
    id: 'trajectory',
    name: 'TRAJECTORY',
    navLabel: 'Trajectory',
    navHref: '#trajectory',
  },
  {
    id: 'contact',
    name: 'CONTACT',
    navLabel: 'Contact',
    navHref: '#contact',
  },
];

/**
 * Returns the 0-based index of a section by its ID or alias.
 */
export const getSectionIndex = (id: string): number => {
  return PORTFOLIO_SECTIONS.findIndex(
    (s) => s.id === id || (id === 'focus' && s.id === 'trajectory')
  );
};

/**
 * Returns the two-digit section number based on its position in PORTFOLIO_SECTIONS.
 * (e.g. '01', '02', '03', '04', ...)
 */
export const getSectionNumber = (id: string): string => {
  const index = getSectionIndex(id);
  if (index === -1) return '00';
  const num = index + 1;
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Returns the full section label formatted as "XX / NAME", e.g. "03 / PROBLEM SOLVING".
 * If nameOverride is provided, it replaces the configured name.
 */
export const getSectionLabel = (id: string, nameOverride?: string): string => {
  const section = PORTFOLIO_SECTIONS.find(
    (s) => s.id === id || (id === 'focus' && s.id === 'trajectory')
  );
  const numberStr = getSectionNumber(id);
  const name = nameOverride || section?.name || id.toUpperCase();
  return `${numberStr} / ${name}`;
};
