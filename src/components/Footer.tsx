import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="app-footer">
            <div className="container footer-content">
                <p>&copy; {new Date().getFullYear()} Takoradi Technical University. All rights reserved.</p>
                <p className="footer-subtext">Graduate Employability Assessment Questionnaire</p>
            </div>
        </footer>
    );
};
