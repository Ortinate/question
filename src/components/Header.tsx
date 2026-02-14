import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="app-header">
            <div className="container header-container">
                <div className="logo-section">
                    <div className="logo-icon-wrapper">
                        <GraduationCap className="logo-icon" />
                    </div>
                    <div className="logo-text">
                        <h1 className="university-name">Takoradi Technical University</h1>
                        <p className="app-name">Graduate Insights</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
