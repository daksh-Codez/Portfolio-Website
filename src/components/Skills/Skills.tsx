import React, { useState } from 'react';
import {
  Terminal,
  Database,
  Globe,
  Wrench,
  Layers,
  GitBranch,
  Cpu,
  Code2,
  Code,
  Server,
  Laptop,
} from 'lucide-react';
import { GithubIcon } from '../Icons/Icons';
import { usePortfolioData } from '../../context/DataContext';
import { SkillRecord } from '../../types/database';

const KNOWN_SKILL_META: Record<string, { role: string; details: string }> = {
  c: {
    role: 'Procedural Systems',
    details: 'Structured memory allocation, pointers, struct records, and file I/O operations.',
  },
  'c++': {
    role: 'OOP & Algorithms',
    details: 'Object-oriented patterns, classes, STL collections, and algorithmic problem solving.',
  },
  cpp: {
    role: 'OOP & Algorithms',
    details: 'Object-oriented patterns, classes, STL collections, and algorithmic problem solving.',
  },
  python: {
    role: 'Scripting & AI Tools',
    details: 'Automation scripts, computational algorithms, and practical exploration of AI workflows.',
  },
  html: {
    role: 'Semantic Markup',
    details: 'Accessible document structure and modern web standards.',
  },
  css: {
    role: 'Styling & Layout',
    details: 'Modern layout architectures including Flexbox, CSS Grid, and responsive design.',
  },
  javascript: {
    role: 'Client-side Logic',
    details: 'ES6+ syntax, DOM manipulation, asynchronous flow, and interactive interfaces.',
  },
  js: {
    role: 'Client-side Logic',
    details: 'ES6+ syntax, DOM manipulation, asynchronous flow, and interactive interfaces.',
  },
  sql: {
    role: 'Relational Data',
    details: 'Relational schema design, structured queries, joins, and data indexing principles.',
  },
  git: {
    role: 'Version Control',
    details: 'Local repository management, branching workflows, and commit history tracking.',
  },
  github: {
    role: 'Collaboration Platform',
    details: 'Remote repository hosting, project documentation, and open-source practices.',
  },
  'visual studio code': {
    role: 'Development IDE',
    details: 'Primary workspace environment with C/C++ compilation suites and custom toolchains.',
  },
  'vs code': {
    role: 'Development IDE',
    details: 'Primary workspace environment with C/C++ compilation suites and custom toolchains.',
  },
  vscode: {
    role: 'Development IDE',
    details: 'Primary workspace environment with C/C++ compilation suites and custom toolchains.',
  },
};

const resolveRole = (skill: SkillRecord): string => {
  const norm = skill.name.trim().toLowerCase();
  if (KNOWN_SKILL_META[norm]?.role) {
    return KNOWN_SKILL_META[norm].role;
  }
  const cat = (skill.category || '').toUpperCase();
  if (cat.includes('PROGRAMMING') || cat.includes('SYSTEMS')) return 'Systems & Core Logic';
  if (cat.includes('WEB')) return 'Web Architecture';
  if (cat.includes('DATA')) return 'Data & Storage';
  if (cat.includes('WORKFLOW') || cat.includes('TOOL')) return 'Workflow & Tooling';
  return 'Technical Skill';
};

const resolveDetails = (skill: SkillRecord): string => {
  const norm = skill.name.trim().toLowerCase();
  if (KNOWN_SKILL_META[norm]?.details) {
    return KNOWN_SKILL_META[norm].details;
  }
  return `Applied competency in ${skill.name} supporting technical implementations and project workflows.`;
};

export const Skills: React.FC = () => {
  const { skillsList } = usePortfolioData();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const publishedSkills = (skillsList || [])
    .filter((s) => s.status === 'published')
    .slice()
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  const programmingSkills = publishedSkills.filter(
    (s) => s.category === '01 / PROGRAMMING & SYSTEMS' || s.category.toUpperCase().includes('PROGRAMMING')
  );
  const webSkills = publishedSkills.filter(
    (s) => s.category === '02 / WEB FOUNDATIONS' || s.category.toUpperCase().includes('WEB')
  );
  const databaseSkills = publishedSkills.filter(
    (s) => s.category === '03 / DATABASE' || s.category.toUpperCase().includes('DATA')
  );
  const toolSkills = publishedSkills.filter(
    (s) =>
      s.category === '04 / DEVELOPMENT WORKFLOW' ||
      s.category.toUpperCase().includes('WORKFLOW') ||
      s.category.toUpperCase().includes('TOOL')
  );
  const otherSkills = publishedSkills.filter(
    (s) =>
      !programmingSkills.includes(s) &&
      !webSkills.includes(s) &&
      !databaseSkills.includes(s) &&
      !toolSkills.includes(s)
  );

  const renderTechIcon = (skill: SkillRecord) => {
    const norm = skill.name.trim().toLowerCase();
    const iconKey = (skill.icon_name || '').trim().toLowerCase();

    // 1. Explicit typography & styles for known 10 skills
    if (norm === 'c') {
      return (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--accent-purple-light)' }}>
          [C]
        </span>
      );
    }
    if (norm === 'c++' || norm === 'cpp') {
      return (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-purple-light)' }}>
          C++
        </span>
      );
    }
    if (norm === 'python') {
      return <Code2 size={20} style={{ color: 'var(--accent-purple-light)' }} />;
    }
    if (norm === 'html') {
      return <Globe size={18} style={{ color: '#38BDF8' }} />;
    }
    if (norm === 'css') {
      return <Layers size={18} style={{ color: '#60A5FA' }} />;
    }
    if (norm === 'javascript' || norm === 'js') {
      return (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.86rem', color: '#FBBF24' }}>
          JS
        </span>
      );
    }
    if (norm === 'sql') {
      return <Database size={19} style={{ color: 'var(--accent-purple-light)' }} />;
    }
    if (norm === 'git') {
      return <GitBranch size={18} style={{ color: '#F97316' }} />;
    }
    if (norm === 'github') {
      return <GithubIcon size={18} style={{ color: 'var(--text-primary)' }} />;
    }
    if (norm === 'visual studio code' || norm === 'vs code' || norm === 'vscode') {
      return <Laptop size={18} style={{ color: '#38BDF8' }} />;
    }

    // 2. Dynamic icon matching by icon_name
    switch (iconKey) {
      case 'terminal':
        return <Terminal size={18} style={{ color: 'var(--accent-purple-light)' }} />;
      case 'database':
        return <Database size={18} style={{ color: 'var(--accent-purple-light)' }} />;
      case 'globe':
        return <Globe size={18} style={{ color: '#38BDF8' }} />;
      case 'wrench':
        return <Wrench size={18} style={{ color: '#F97316' }} />;
      case 'layers':
        return <Layers size={18} style={{ color: '#60A5FA' }} />;
      case 'gitbranch':
        return <GitBranch size={18} style={{ color: '#F97316' }} />;
      case 'cpu':
        return <Cpu size={18} style={{ color: 'var(--accent-purple-light)' }} />;
      case 'code2':
        return <Code2 size={18} style={{ color: 'var(--accent-purple-light)' }} />;
      case 'code':
        return <Code size={18} style={{ color: '#FBBF24' }} />;
      case 'server':
        return <Server size={18} style={{ color: 'var(--accent-purple-light)' }} />;
      case 'laptop':
      case 'monitor':
        return <Laptop size={18} style={{ color: '#38BDF8' }} />;
      case 'github':
        return <GithubIcon size={18} style={{ color: 'var(--text-primary)' }} />;
      default:
        return <Code2 size={18} style={{ color: 'var(--accent-purple-light)' }} />;
    }
  };

  return (
    <section
      id="skills"
      style={{
        paddingTop: 'clamp(84px, 12vw, 150px)',
        paddingBottom: 'clamp(84px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="editorial-container">
        {/* Section Identifier */}
        <div className="section-label">02 / CAPABILITIES</div>

        {/* Section Introduction */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(20px, 3.5vw, 40px)',
            alignItems: 'baseline',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}
        >
          <div style={{ gridColumn: 'span 12' }} className="skills-heading-col">
            <h2 className="section-hero-heading" style={{ margin: 0 }}>
              Tools of my{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-purple-light)' }}>
                trade.
              </span>
            </h2>
          </div>

          <div style={{ gridColumn: 'span 12' }} className="skills-desc-col">
            <p
              className="body-editorial"
              style={{
                fontSize: 'clamp(1rem, 1.15vw, 1.14rem)',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                maxWidth: '640px',
                margin: 0,
              }}
            >
              A focused repertoire of programming languages, foundational web technologies, and developer tooling built through deliberate practice.
            </p>
          </div>
        </div>

        {/* Asymmetrical Showcase Composition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* 01 / PROGRAMMING & SYSTEMS — Prominent Feature Showcase */}
          <div
            style={{
              backgroundColor: 'rgba(10, 10, 15, 0.82)',
              border: '1px solid var(--border-hairline)',
              borderTop: '2px solid var(--accent-purple)',
              borderRadius: '6px',
              padding: 'clamp(28px, 4vw, 44px)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)',
            }}
            className="programming-showcase-panel"
          >
            {/* Category Header */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: 'clamp(28px, 4vw, 36px)',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--border-hairline)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--accent-purple-light)',
                    letterSpacing: '0.04em',
                  }}
                >
                  01
                </span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Programming & Systems
                </h3>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.03em',
                  padding: '5px 14px',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '20px',
                }}
              >
                CORE TECHNICAL FOCUS
              </span>
            </div>

            {/* Prominent Technology Elements */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {programmingSkills.map((skill) => {
                const isHovered = hoveredSkill === skill.name;
                const role = resolveRole(skill);
                const details = resolveDetails(skill);
                return (
                  <div
                    key={skill.id || skill.name}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      padding: '24px',
                      backgroundColor: isHovered ? 'rgba(28, 32, 46, 0.85)' : 'rgba(22, 22, 32, 0.65)',
                      border: isHovered ? '1px solid rgba(139, 92, 246, 0.45)' : '1px solid var(--border-hairline)',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '170px',
                      transition: 'all 0.25s var(--ease-editorial)',
                      transform: isHovered ? 'translateY(-3px)' : 'none',
                    }}
                    className="tech-feature-card"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(139, 92, 246, 0.12)',
                              border: '1px solid rgba(139, 92, 246, 0.24)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {renderTechIcon(skill)}
                          </div>
                          <div>
                            <h4
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                margin: 0,
                                lineHeight: '1.1',
                              }}
                            >
                              {skill.name}
                            </h4>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--accent-purple-light)',
                              }}
                            >
                              {role}
                            </span>
                          </div>
                        </div>

                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-purple)',
                            boxShadow: isHovered ? '0 0 10px var(--accent-purple)' : 'none',
                          }}
                        />
                      </div>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6',
                          margin: 0,
                        }}
                      >
                        {details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Asymmetric 3-Column Grid for Web, Database, and Workflow */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '24px',
            }}
          >
            {/* 02 / WEB FOUNDATIONS (Spans 4 cols on desktop) */}
            <div
              style={{
                gridColumn: 'span 12',
                backgroundColor: 'rgba(10, 10, 15, 0.72)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '6px',
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="skills-col-web"
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      color: 'var(--accent-purple-light)',
                    }}
                  >
                    02
                  </span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: 'var(--text-primary)',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Web Foundations
                  </h3>
                </div>

                {/* Web items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {webSkills.map((skill) => {
                    const role = resolveRole(skill);
                    return (
                      <div
                        key={skill.id || skill.name}
                        style={{
                          padding: '14px 18px',
                          backgroundColor: 'rgba(14, 14, 20, 0.65)',
                          border: '1px solid var(--border-hairline)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          transition: 'border-color 0.2s ease, background-color 0.2s ease',
                        }}
                        className="tech-sub-plate"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                            {renderTechIcon(skill)}
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.98rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                display: 'block',
                                lineHeight: '1.2',
                              }}
                            >
                              {skill.name}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.78rem',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {role}
                            </span>
                          </div>
                        </div>

                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 03 / DATABASE (Spans 4 cols on desktop) */}
            <div
              style={{
                gridColumn: 'span 12',
                backgroundColor: 'rgba(10, 10, 15, 0.72)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '6px',
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="skills-col-db"
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      color: 'var(--accent-purple-light)',
                    }}
                  >
                    03
                  </span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: 'var(--text-primary)',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Database
                  </h3>
                </div>

                {/* Database Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {databaseSkills.map((skill) => {
                    const role = resolveRole(skill);
                    const details = resolveDetails(skill);
                    return (
                      <div
                        key={skill.id || skill.name}
                        style={{
                          padding: '18px 20px',
                          backgroundColor: 'rgba(14, 14, 20, 0.65)',
                          border: '1px solid var(--border-hairline)',
                          borderRadius: '4px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          transition: 'border-color 0.2s ease, background-color 0.2s ease',
                        }}
                        className="tech-sub-plate"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {renderTechIcon(skill)}
                            </div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                              }}
                            >
                              {skill.name}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.76rem',
                              fontWeight: 600,
                              color: 'var(--accent-purple-light)',
                            }}
                          >
                            {role}
                          </span>
                        </div>

                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.86rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.5',
                            margin: 0,
                          }}
                        >
                          {details}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 04 / DEVELOPMENT WORKFLOW (Spans 4 cols on desktop) */}
            <div
              style={{
                gridColumn: 'span 12',
                backgroundColor: 'rgba(10, 10, 15, 0.72)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '6px',
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="skills-col-tools"
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.94rem',
                      fontWeight: 700,
                      color: 'var(--accent-purple-light)',
                    }}
                  >
                    04
                  </span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: 'var(--text-primary)',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Workflow & Tools
                  </h3>
                </div>

                {/* Tools Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {toolSkills.map((skill) => {
                    const role = resolveRole(skill);
                    return (
                      <div
                        key={skill.id || skill.name}
                        style={{
                          padding: '14px 18px',
                          backgroundColor: 'rgba(14, 14, 20, 0.65)',
                          border: '1px solid var(--border-hairline)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          transition: 'border-color 0.2s ease, background-color 0.2s ease',
                        }}
                        className="tech-sub-plate"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                            {renderTechIcon(skill)}
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.96rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                display: 'block',
                                lineHeight: '1.2',
                              }}
                            >
                              {skill.name}
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.78rem',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {role}
                            </span>
                          </div>
                        </div>

                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Optional: Additional Technologies Panel (for skills in custom/additional categories) */}
          {otherSkills.length > 0 && (
            <div
              style={{
                backgroundColor: 'rgba(10, 10, 15, 0.72)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '6px',
                padding: 'clamp(24px, 3vw, 32px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: 'var(--accent-purple-light)',
                  }}
                >
                  +
                </span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Additional Technologies
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '12px',
                }}
              >
                {otherSkills.map((skill) => (
                  <div
                    key={skill.id || skill.name}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: 'rgba(14, 14, 20, 0.65)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      transition: 'border-color 0.2s ease, background-color 0.2s ease',
                    }}
                    className="tech-sub-plate"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                        {renderTechIcon(skill)}
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.96rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            display: 'block',
                            lineHeight: '1.2',
                          }}
                        >
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.78rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {resolveRole(skill)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .skills-heading-col {
            grid-column: span 6 !important;
          }
          .skills-desc-col {
            grid-column: span 6 !important;
          }
          .skills-col-web {
            grid-column: span 4 !important;
          }
          .skills-col-db {
            grid-column: span 4 !important;
          }
          .skills-col-tools {
            grid-column: span 4 !important;
          }
        }
        .tech-feature-card:hover {
          border-color: rgba(139, 92, 246, 0.45) !important;
          background-color: rgba(26, 30, 44, 0.85) !important;
        }
        .tech-sub-plate:hover {
          border-color: rgba(139, 92, 246, 0.35) !important;
          background-color: rgba(30, 32, 46, 0.75) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
