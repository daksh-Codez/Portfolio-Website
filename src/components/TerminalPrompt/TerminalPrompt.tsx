import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { projects } from '../../data/projects';
import { skillGroups } from '../../data/skills';

export const TerminalPrompt: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'init',
      output: 'Daksh Goswami CLI Environment [v1.0.0]. Type "help" to view supported commands.'
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        response = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Available commands:</div>
            <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent-violet-light)' }}>about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Academic profile & philosophy</div>
            <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent-violet-light)' }}>skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Programming languages & tooling</div>
            <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent-violet-light)' }}>projects</span>&nbsp;&nbsp;&nbsp;- List of selected C/C++ works</div>
            <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent-violet-light)' }}>status</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Current academic & career status</div>
            <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent-violet-light)' }}>contact</span>&nbsp;&nbsp;&nbsp;&nbsp;- Reach out channels</div>
            <div>&nbsp;&nbsp;<span style={{ color: 'var(--accent-violet-light)' }}>clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear screen history</div>
          </div>
        );
        break;
      case 'about':
        response = `${personalInfo.name} — ${personalInfo.role}. Student at ${personalInfo.university} studying ${personalInfo.degree}.`;
        break;
      case 'skills':
        response = `Programming: C, C++, Python | Web: HTML, CSS, JS | DB: SQL | Tools: VS Code, Git, GitHub`;
        break;
      case 'projects':
        response = (
          <div>
            {projects.map((p) => (
              <div key={p.id}>[{p.number}] {p.title} ({p.language}) - {p.category}</div>
            ))}
          </div>
        );
        break;
      case 'status':
        response = personalInfo.status;
        break;
      case 'contact':
        response = `Location: ${personalInfo.location} | GitHub: dakshcodez`;
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        response = `Command not recognized: "${trimmed}". Type "help" for a list of commands.`;
    }

    setHistory((prev) => [...prev, { cmd, output: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Toggle Pill */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 800,
        }}
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open developer terminal prompt"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: 'rgba(28, 28, 38, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.25s var(--ease-editorial)',
            }}
            className="terminal-toggle-btn"
          >
            <TerminalIcon size={14} style={{ color: 'var(--accent-violet-light)' }} />
            <span>CLI PROMPT</span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-violet)',
              }}
            />
          </button>
        )}
      </div>

      {/* Floating Terminal Drawer Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Developer Interactive Terminal"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: 'clamp(320px, 90vw, 480px)',
            height: '360px',
            backgroundColor: 'rgba(20, 20, 28, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(155, 123, 238, 0.4)',
            borderRadius: '6px',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.55)',
            zIndex: 850,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Title Header */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: 'rgba(28, 28, 38, 0.95)',
              borderBottom: '1px solid var(--border-hairline)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TerminalIcon size={13} style={{ color: 'var(--accent-violet-light)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.08em',
                }}
              >
                daksh@system:~
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close terminal"
              style={{
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Console Body */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              lineHeight: '1.5',
              color: 'var(--text-secondary)',
            }}
          >
            {history.map((h, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ color: 'var(--accent-violet-light)', marginBottom: '3px' }}>
                  $ {h.cmd}
                </div>
                <div style={{ color: '#d1d1dc', wordBreak: 'break-word' }}>
                  {h.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Prompt Input Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '10px 14px',
              borderTop: '1px solid var(--border-hairline)',
              backgroundColor: 'rgba(14, 14, 20, 0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: 'var(--accent-violet)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              &gt;
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Try typing 'help', 'projects', 'skills'..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: 'var(--text-primary)',
              }}
              autoFocus
            />
          </form>
        </div>
      )}

      <style>{`
        .terminal-toggle-btn:hover {
          border-color: var(--accent-violet) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(139, 92, 246, 0.25) !important;
        }
      `}</style>
    </>
  );
};
