import React from 'react';
import type { QuestionnaireData } from '../types';
import { LikertScale } from './LikertScale';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section5: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    const updateEntrepreneurship = (field: keyof QuestionnaireData['entrepreneurship'], value: string) => {
        updateData({
            entrepreneurship: {
                ...data.entrepreneurship,
                [field]: value,
            },
        });
    };

    const options = [
        { value: '1', label: '1 - Strongly Disagree' },
        { value: '2', label: '2 - Disagree' },
        { value: '3', label: '3 - Neutral' },
        { value: '4', label: '4 - Agree' },
        { value: '5', label: '5 - Strongly Agree' },
    ];

    return (
        <div className="section-container">
            <div>
                <h2 className="section-title">Section 5: Entrepreneurship Self-Efficacy</h2>
                <p className="section-subtitle">To assess confidence in starting and running a business.</p>
            </div>

            <div className="subsection-card">
                <LikertScale
                    label="23. I believe I have the skills needed to start a business."
                    name="entrepreneurship.skills"
                    value={data.entrepreneurship.skills}
                    onChange={(val) => updateEntrepreneurship('skills', val)}
                    options={options}
                    error={errors['entrepreneurship.skills']}
                />
                <LikertScale
                    label="24. I am confident in my ability to identify new business opportunities."
                    name="entrepreneurship.opportunities"
                    value={data.entrepreneurship.opportunities}
                    onChange={(val) => updateEntrepreneurship('opportunities', val)}
                    options={options}
                    error={errors['entrepreneurship.opportunities']}
                />
                <LikertScale
                    label="25. I can overcome challenges in starting a business."
                    name="entrepreneurship.challenges"
                    value={data.entrepreneurship.challenges}
                    onChange={(val) => updateEntrepreneurship('challenges', val)}
                    options={options}
                    error={errors['entrepreneurship.challenges']}
                />
                <LikertScale
                    label="26. I have access to resources (financial, network, mentorship) to start a business."
                    name="entrepreneurship.resources"
                    value={data.entrepreneurship.resources}
                    onChange={(val) => updateEntrepreneurship('resources', val)}
                    options={options}
                    error={errors['entrepreneurship.resources']}
                />
                <LikertScale
                    label="27. I am willing to take calculated risks to achieve entrepreneurial success."
                    name="entrepreneurship.risks"
                    value={data.entrepreneurship.risks}
                    onChange={(val) => updateEntrepreneurship('risks', val)}
                    options={options}
                    error={errors['entrepreneurship.risks']}
                />
            </div>
        </div>
    );
};
