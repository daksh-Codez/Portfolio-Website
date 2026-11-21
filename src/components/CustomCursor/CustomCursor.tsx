import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device has touch primary
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [data-cursor-expand]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

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
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease'
        }}
      />
      {/* Trailing subtle ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderRadius: '50%',
          border: isHovered ? '1px solid var(--accent-violet)' : '1px solid rgba(255, 255, 255, 0.22)',
          backgroundColor: isHovered ? 'rgba(155, 123, 238, 0.1)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 14)}px, ${trailingPos.y - (isHovered ? 24 : 14)}px, 0)`,
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease'
        }}
      />
    </>
  );
};
