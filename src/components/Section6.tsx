import React from 'react';
import type { QuestionnaireData } from '../types';
import { RadioGroup } from './RadioGroup';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section6: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    return (
        <div className="section-container">
            <h2 className="section-title">Section 6: Job Search Preparedness & Support</h2>

            <RadioGroup
                label="28. Have you used any university career services?"
                name="careerServices"
                value={data.careerServices}
                onChange={(value) => updateData({ careerServices: value })}
                options={[
                    { value: 'Yes, frequently', label: 'Yes, frequently' },
                    { value: 'Yes, occasionally', label: 'Yes, occasionally' },
                    { value: 'No', label: 'No' },
                ]}
                error={errors.careerServices}
            />

            <RadioGroup
                label="29. How strong is your professional network (e.g., LinkedIn, industry contacts)?"
                name="professionalNetwork"
                value={data.professionalNetwork}
                onChange={(value) => updateData({ professionalNetwork: value })}
                options={[
                    { value: 'Very strong', label: 'Very strong' },
                    { value: 'Moderately strong', label: 'Moderately strong' },
                    { value: 'Weak', label: 'Weak' },
                    { value: 'Nonexistent', label: 'Nonexistent' },
                ]}
                error={errors.professionalNetwork}
            />

            <RadioGroup
                label="30. Do you feel your university has adequately prepared you for the job market?"
                name="universityPreparation"
                value={data.universityPreparation}
                onChange={(value) => updateData({ universityPreparation: value })}
                options={[
                    { value: 'Yes, very well', label: 'Yes, very well' },
                    { value: 'Yes, somewhat', label: 'Yes, somewhat' },
                    { value: 'Neutral', label: 'Neutral' },
                    { value: 'No, not really', label: 'No, not really' },
                    { value: 'No, not at all', label: 'No, not at all' },
                ]}
                error={errors.universityPreparation}
            />
        </div>
    );
};
