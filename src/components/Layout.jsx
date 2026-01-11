import React from 'react';
import { Outlet } from 'react-router-dom';
import { FileText, ShieldAlert } from 'lucide-react';

export default function Layout() {
    return (
        <div className="app-container">
            {/* Disclaimer Banner - Crucial for "Disclosure over Verification" */}
            <div className="disclaimer-banner">
                This system hosts producer-declared information. Hedamo does not verify or certify these claims.
            </div>

            <header className="app-header">
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo-icon">
                            <FileText size={20} color="white" />
                        </div>
                        <span className="logo-text">HEDAMO</span>
                    </div>
                    <div className="user-profile">
                        <div className="avatar">JD</div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="app-footer">
                <p>&copy; 2023 Hedamo Disclosure System. Not a certification body.</p>
            </footer>

            {/* Inline Styles for Layout (to be moved to CSS if complex) */}
            <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .app-header {
          background-color: #fff;
          border-bottom: 1px solid var(--border-subtle);
          padding: 0 var(--space-6);
        }
        
        .header-content {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        
        .logo-icon {
          background-color: var(--primary);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        
        .logo-text {
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .user-profile .avatar {
          width: 32px;
          height: 32px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-subtle);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .main-content {
          flex: 1;
          padding: var(--space-8) var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .app-footer {
          padding: var(--space-6);
          text-align: center;
          color: var(--text-tertiary);
          font-size: 13px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
        </div>
    );
}
