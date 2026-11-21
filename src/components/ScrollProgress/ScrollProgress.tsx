import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '2px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 60%, #FFFFFF 100%)',
          boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)',
          transition: 'width 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)'
        }}
      />
    </div>
  );
};
