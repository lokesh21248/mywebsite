import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

// --- Card Component ---
export function Card({ children, className, onClick, ...props }) {
    return (
        <div
            className={clsx('card', className)}
            onClick={onClick}
            {...props}
        >
            {children}
            <style>{`
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          overflow: hidden;
        }
        .card:hover { 
          border-color: var(--border-strong);
        }
      `}</style>
        </div>
    );
}

// --- Badge Component ---
export function Badge({ status }) {
    const normalized = status.toLowerCase();

    // Map status to CSS var style groups defined in index.css
    const styleMap = {
        draft: { bg: 'var(--status-draft-bg)', color: 'var(--status-draft-text)' },
        submitted: { bg: 'var(--status-submitted-bg)', color: 'var(--status-submitted-text)' },
        published: { bg: 'var(--status-published-bg)', color: 'var(--status-published-text)' }
    };

    const styles = styleMap[normalized] || styleMap.draft;

    return (
        <span className="badge" style={{ backgroundColor: styles.bg, color: styles.color }}>
            {status}
            <style>{`
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }
      `}</style>
        </span>
    );
}

// --- Button Component ---
export function Button({ children, variant = 'primary', className, icon: Icon, ...props }) {
    return (
        <button className={clsx('btn', `btn-${variant}`, className)} {...props}>
            {Icon && <Icon size={16} className="btn-icon" />}
            {children}
            <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          border: 1px solid transparent;
          transition: all var(--transition-fast);
        }
        .btn-primary {
          background-color: var(--primary);
          color: white;
        }
        .btn-primary:hover { background-color: var(--primary-hover); }
        
        .btn-secondary {
          background-color: white;
          border-color: var(--border-subtle);
          color: var(--text-secondary);
        }
        .btn-secondary:hover {
          background-color: var(--bg-app);
          border-color: var(--border-strong);
          color: var(--text-primary);
        }
        .btn-ghost {
            background-color: transparent;
            color: var(--text-tertiary);
        }
        .btn-ghost:hover {
            color: var(--text-primary);
            background: var(--bg-app);
        }
      `}</style>
        </button>
    );
}

// --- Input Component ---
export function Input({ icon: Icon, className, ...props }) {
    return (
        <div className={clsx('input-wrapper', className)}>
            {Icon && <Icon size={18} className="input-icon" />}
            <input className="input-field" {...props} />
            <style>{`
                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .input-icon {
                    position: absolute;
                    left: 12px;
                    color: var(--text-tertiary);
                    pointer-events: none;
                }
                .input-field {
                    width: 100%;
                    height: 40px;
                    padding: 0 12px;
                    padding-left: ${Icon ? '40px' : '12px'};
                    border: 1px solid var(--border-subtle);
                    border-radius: var(--radius-md);
                    font-size: 14px;
                    color: var(--text-primary);
                    background: white;
                    transition: border-color var(--transition-fast);
                }
                .input-field:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 1px var(--primary);
                }
                .input-field::placeholder {
                    color: var(--text-tertiary);
                }
            `}</style>
        </div>
    )
}

// --- Select Component ---
export function Select({ options, value, onChange, label, ...props }) {
    return (
        <div className="select-wrapper">
            <select className="select-field" value={value} onChange={onChange} {...props}>
                <option value="">{label || "All"}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <ChevronDown size={14} className="select-arrow" />
            <style>{`
                .select-wrapper {
                    position: relative;
                    min-width: 140px;
                }
                .select-field {
                    width: 100%;
                    height: 40px;
                    padding: 0 32px 0 12px;
                    appearance: none;
                    background: white;
                    border: 1px solid var(--border-subtle);
                    border-radius: var(--radius-md);
                    font-size: 14px;
                    color: var(--text-primary);
                    cursor: pointer;
                }
                .select-field:focus {
                     outline: none;
                    border-color: var(--primary);
                }
                .select-arrow {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-tertiary);
                    pointer-events: none;
                }
            `}</style>
        </div>
    )
}
