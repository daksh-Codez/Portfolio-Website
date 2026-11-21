import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    // Check if device has touch primary or prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchOrReduced(true);
      return;
    }

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const determineLabel = (target: HTMLElement): string | null => {
      // 1. Explicit data attribute override
      const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');
      if (customLabel) return customLabel;

      // 2. View Repository or GitHub links
      if (target.closest('.view-repo-btn') || target.closest('a[href*="github.com"]')) {
        return 'OPEN';
      }

      // 3. Copy button
      if (target.closest('button[title*="copy"]') || target.closest('button:has(svg)')) {
        const btnText = target.closest('button')?.textContent || '';
        if (btnText.includes('COPY') || btnText.includes('COPIED')) {
          return 'COPY';
        }
      }

      // 4. Contact or social links
      if (target.closest('a[href^="#contact"]') || target.closest('.milestone-cta')) {
        return 'CONNECT';
      }

      // 5. Section anchors
      if (target.closest('a[href^="#work"]')) {
        return 'VIEW';
      }

      if (target.closest('a[href^="#skills"]') || target.closest('a[href^="#about"]') || target.closest('a[href^="#education"]')) {
        return 'EXPLORE';
      }

      // 6. External links
      const anchor = target.closest('a');
      if (anchor && (anchor.target === '_blank' || anchor.href.startsWith('http'))) {
        return 'OPEN';
      }

      // 7. General interactive controls
      if (target.closest('a, button, [role="button"]')) {
        return 'EXPLORE';
      }

      return null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], [data-cursor-expand], [data-cursor-label], input, textarea');
        if (interactive) {
          setIsHovered(true);
          const label = determineLabel(target);
          setCursorLabel(label);
        } else {
          setIsHovered(false);
          setCursorLabel(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setCursorLabel(null);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchOrReduced || !isVisible) return null;

  const hasLabel = isHovered && !!cursorLabel;

  // Dimensions based on contextual state
  const ringWidth = hasLabel ? 68 : isHovered ? 44 : 28;
  const ringHeight = hasLabel ? 26 : isHovered ? 44 : 28;
  const ringBorderRadius = hasLabel ? '13px' : '50%';

  return (
    <>
      {/* Precision center dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-violet)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${hasLabel ? 0.4 : 1})`,
          opacity: hasLabel ? 0.3 : 1,
          transition: 'transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease'
        }}
        aria-hidden="true"
      />

      {/* Trailing contextual ring / capsule */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${ringWidth}px`,
          height: `${ringHeight}px`,
          borderRadius: ringBorderRadius,
          border: isHovered
            ? '1px solid rgba(139, 92, 246, 0.55)'
            : '1px solid rgba(255, 255, 255, 0.22)',
          backgroundColor: hasLabel
            ? 'rgba(13, 15, 24, 0.88)'
            : isHovered
            ? 'rgba(139, 92, 246, 0.12)'
            : 'transparent',
          backdropFilter: hasLabel ? 'blur(6px)' : 'none',
          WebkitBackdropFilter: hasLabel ? 'blur(6px)' : 'none',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate3d(${trailingPos.x - ringWidth / 2}px, ${trailingPos.y - ringHeight / 2}px, 0)`,
          transition:
            'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: hasLabel ? '0 4px 16px rgba(0, 0, 0, 0.45)' : 'none',
        }}
        aria-hidden="true"
      >
        {/* Contextual Label */}
        {hasLabel && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#C4B5FD',
              textTransform: 'uppercase',
              lineHeight: 1,
              userSelect: 'none',
              animation: 'cursorLabelFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {cursorLabel}
          </span>
        )}
      </div>

      <style>{`
        @keyframes cursorLabelFadeIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};
