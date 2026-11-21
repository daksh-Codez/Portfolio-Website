import React, { useEffect, useState } from 'react';

export const AmbientLight: React.FC = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    // Disable or simplify on touch devices or reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchOrReduced(true);
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateLoop = () => {
      // Gentle, luxurious damping for organic floating feel
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchOrReduced) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          transform: `translate3d(${pos.x - 375}px, ${pos.y - 375}px, 0)`,
          background: `radial-gradient(
            circle at center,
            rgba(139, 92, 246, 0.045) 0%,
            rgba(168, 85, 247, 0.024) 34%,
            rgba(255, 255, 255, 0.009) 58%,
            transparent 74%
          )`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
