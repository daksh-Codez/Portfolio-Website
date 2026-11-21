import React from 'react';
import { trajectoryItems, internshipMilestone, TrajectoryType } from '../../data/education';
import {
  Compass,
  Layers,
  Cpu,
  Hammer,
  GitBranch,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CurrentFocus: React.FC = () => {
  const getIconForType = (type: TrajectoryType) => {
    switch (type) {
      case 'learning':
        return <Layers size={16} />;
      case 'practice':
        return <Cpu size={16} />;
      case 'building':
        return <Hammer size={16} />;
      case 'workflow':
        return <GitBranch size={16} />;
      case 'exploration':
        return <Sparkles size={16} />;
    }
  };

  const getTypeLabel = (type: TrajectoryType) => {
    switch (type) {
      case 'learning':
        return 'CORE FOUNDATION';
      case 'practice':
        return 'PROBLEM SOLVING';
      case 'building':
        return 'PRACTICAL BUILDING';
      case 'workflow':
        return 'WORKFLOW & TOOLING';
      case 'exploration':
        return 'AI EXPLORATION';
    }
  };

  return (
    <section
      id="focus"
      style={{
        paddingTop: 'clamp(80px, 12vw, 150px)',
        paddingBottom: 'clamp(80px, 12vw, 150px)',
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(12, 12, 18, 0.4)',
      }}
    >
      <div className="editorial-container">
        {/* Section Label */}
        <div className="section-label">05 / TRAJECTORY</div>

        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: 'clamp(48px, 7vw, 76px)',
          }}
        >
          <div>
            <h2 className="section-hero-heading">
              Currently{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-violet-light)' }}>
                exploring.
              </span>
            </h2>
          </div>
          <div style={{ maxWidth: '440px' }}>
            <p className="body-editorial" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              What I'm learning, building, and working towards.
            </p>
          </div>
        </div>

        {/* Editorial Development Timeline */}
        <div className="trajectory-timeline">
          {trajectoryItems.map((item, idx) => {
            const isLast = idx === trajectoryItems.length - 1;

            return (
              <div key={item.number} className={`timeline-item type-${item.type}`}>
                {/* Left Rail: Node & Connecting Line */}
                <div className="timeline-rail">
                  <div className="timeline-node" aria-hidden="true">
                    {getIconForType(item.type)}
                  </div>
                  {/* Stem connects down to next node */}
                  <div className="timeline-stem" />
                </div>

                {/* Right Content Area */}
                <div className="timeline-content">
                  {/* Category Header Bar */}
                  <div className="timeline-meta-bar">
                    <div className="timeline-identity">
                      <span className="timeline-number">{item.number}</span>
                      <span className="timeline-slash">/</span>
                      <span className="timeline-phase">{item.phase}</span>
                    </div>
                    <span className={`timeline-badge badge-${item.type}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="timeline-title">{item.title}</h3>

                  {/* Concise natural description */}
                  <p className="timeline-description">{item.description}</p>

                  {/* Detail Focus Tags */}
                  <div className="timeline-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="timeline-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Connected Milestone: Internship Objective */}
          <div className="timeline-item milestone-timeline-item">
            {/* Left Rail with Destination Node */}
            <div className="timeline-rail">
              <div className="timeline-node milestone-node" aria-hidden="true">
                <Compass size={17} />
              </div>
            </div>

            {/* Right Milestone Content */}
            <div className="milestone-box">
              <div className="milestone-top-row">
                <span className="milestone-eyebrow">
                  {internshipMilestone.eyebrow}
                </span>
                <span className="milestone-badge">
                  {internshipMilestone.badge}
                </span>
              </div>

              <h3 className="milestone-title">
                {internshipMilestone.title}
              </h3>

              <p className="milestone-description">
                {internshipMilestone.description}
              </p>

              <div className="milestone-footer">
                <a href="#contact" className="milestone-cta">
                  <span>Open for discussions & opportunities</span>
                  <ArrowRight size={14} className="milestone-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Timeline Container */
        .trajectory-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          max-width: 920px;
          margin: 0 auto;
        }

        /* Timeline Entry Row */
        .timeline-item {
          display: flex;
          position: relative;
          padding-bottom: clamp(36px, 5vw, 56px);
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        /* Left Rail (Node + Line) */
        .timeline-rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 48px;
          min-width: 48px;
          margin-right: clamp(20px, 3.5vw, 36px);
          position: relative;
        }

        /* Timeline Node Icon */
        .timeline-node {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(14, 15, 22, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.35);
          color: #93C5FD;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 4px rgba(9, 9, 13, 0.8), 0 4px 12px rgba(0, 0, 0, 0.4);
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-item:hover .timeline-node {
          border-color: #60A5FA;
          color: #FFFFFF;
          background: rgba(24, 28, 44, 0.95);
          transform: scale(1.08);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 0 4px rgba(9, 9, 13, 0.9);
        }

        /* Continuous Connecting Line Stem */
        .timeline-stem {
          position: absolute;
          top: 38px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.35) 0%,
            rgba(59, 130, 246, 0.2) 60%,
            rgba(59, 130, 246, 0.1) 100%
          );
        }

        .timeline-item:hover .timeline-stem {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.6) 0%,
            rgba(59, 130, 246, 0.35) 100%
          );
        }

        /* Content Area */
        .timeline-content {
          flex: 1;
          padding: 24px 28px;
          background: rgba(16, 17, 24, 0.45);
          border: 1px solid var(--border-hairline);
          border-radius: 6px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
        }

        .timeline-item:hover .timeline-content {
          background: rgba(20, 22, 32, 0.7);
          border-color: rgba(59, 130, 246, 0.28);
          transform: translateX(4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
        }

        /* Meta Bar (Number, Phase, Badge) */
        .timeline-meta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .timeline-identity {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
        }

        .timeline-number {
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--accent-violet-light);
          letter-spacing: 0.04em;
        }

        .timeline-slash {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .timeline-phase {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Type Badges */
        .timeline-badge {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 12px;
          border: 1px solid transparent;
        }

        .badge-learning {
          background: rgba(59, 130, 246, 0.1);
          color: #93C5FD;
          border-color: rgba(59, 130, 246, 0.25);
        }

        .badge-practice {
          background: rgba(56, 189, 248, 0.1);
          color: #7DD3FC;
          border-color: rgba(56, 189, 248, 0.25);
        }

        .badge-building {
          background: rgba(96, 165, 250, 0.12);
          color: #BFDBFE;
          border-color: rgba(96, 165, 250, 0.35);
        }

        .badge-workflow {
          background: rgba(148, 163, 184, 0.1);
          color: #CBD5E1;
          border-color: rgba(148, 163, 184, 0.22);
        }

        .badge-exploration {
          background: rgba(168, 85, 247, 0.12);
          color: #D8B4FE;
          border-color: rgba(168, 85, 247, 0.3);
        }

        /* Title */
        .timeline-title {
          font-family: var(--font-body);
          font-size: clamp(1.2rem, 1.8vw, 1.45rem);
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin-bottom: 10px;
          line-height: 1.3;
          transition: color 0.25s ease;
        }

        .timeline-item:hover .timeline-title {
          color: #FFFFFF;
        }

        /* Description */
        .timeline-description {
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.68;
          color: var(--text-secondary);
          margin-bottom: 18px;
          max-width: 720px;
        }

        /* Tags */
        .timeline-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .timeline-tag-pill {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: rgba(226, 232, 240, 0.75);
          padding: 3px 9px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-hairline);
          border-radius: 3px;
          transition: all 0.2s ease;
        }

        .timeline-item:hover .timeline-tag-pill {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          color: rgba(226, 232, 240, 0.95);
        }

        /* =========================================
           Milestone Box (Natural Timeline Conclusion)
           ========================================= */
        .milestone-timeline-item {
          padding-bottom: 0;
        }

        .milestone-node {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(14, 15, 22, 0.95)) !important;
          border-color: rgba(59, 130, 246, 0.6) !important;
          color: #93C5FD !important;
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.35), 0 0 0 4px rgba(9, 9, 13, 0.8) !important;
        }

        .milestone-box {
          flex: 1;
          padding: clamp(24px, 4vw, 36px);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.07) 0%, rgba(16, 18, 26, 0.75) 100%);
          border: 1px solid rgba(59, 130, 246, 0.28);
          border-radius: 6px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(12px);
        }

        .milestone-box:hover {
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.15);
        }

        .milestone-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
        }

        .milestone-eyebrow {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--accent-violet-light);
        }

        .milestone-badge {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 12px;
          background: rgba(59, 130, 246, 0.15);
          color: #93C5FD;
          border: 1px solid rgba(59, 130, 246, 0.4);
          border-radius: 12px;
        }

        .milestone-title {
          font-family: var(--font-body);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.25;
        }

        .milestone-description {
          font-family: var(--font-body);
          font-size: 0.96rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 22px;
          max-width: 640px;
        }

        .milestone-footer {
          display: flex;
          align-items: center;
        }

        .milestone-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--accent-violet-light);
          text-decoration: none;
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-radius: 4px;
          transition: all 0.25s ease;
        }

        .milestone-cta:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.55);
          color: #FFFFFF;
          transform: translateX(3px);
        }

        .milestone-arrow {
          transition: transform 0.2s ease;
        }

        .milestone-cta:hover .milestone-arrow {
          transform: translateX(3px);
        }

        /* =========================================
           Mobile Responsiveness
           ========================================= */
        @media (max-width: 640px) {
          .timeline-rail {
            width: 32px;
            min-width: 32px;
            margin-right: 14px;
          }

          .timeline-node {
            width: 30px;
            height: 30px;
          }

          .timeline-node svg {
            width: 13px;
            height: 13px;
          }

          .timeline-stem {
            top: 30px;
          }

          .timeline-content {
            padding: 16px 18px;
          }

          .timeline-meta-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .milestone-box {
            padding: 20px 18px;
          }
        }
      `}</style>
    </section>
  );
};
