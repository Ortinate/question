import React from 'react';
import type { QuestionnaireData } from '../types';
import { RadioGroup } from './RadioGroup';
import { Input } from './Input';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section7: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    // Capitalize first letter of the first word (Sentence Case)
    const toSentenceCase = (value: string) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
        <div className="section-container">
            <h2 className="section-title">Section 7: Perceived Barriers & Enablers</h2>

            <div className="form-group-container">
                <RadioGroup
                    label="31. What do you see as the biggest barrier to gaining employment after graduation?"
                    name="employmentBarrier"
                    value={data.employmentBarrier}
                    onChange={(value) => updateData({ employmentBarrier: value })}
                    options={[
                        { value: 'Lack of work experience', label: 'Lack of work experience' },
                        { value: 'Economic conditions', label: 'Economic conditions' },
                        { value: 'Insufficient skills', label: 'Insufficient skills' },
                        { value: 'Limited job opportunities in my field', label: 'Limited job opportunities in my field' },
                        { value: 'Other', label: 'Other' },
                    ]}
                    error={errors.employmentBarrier}
                />
                {data.employmentBarrier === 'Other' && (
                    <Input
                        label="Please specify:"
                        name="employmentBarrierOther"
                        value={data.employmentBarrierOther}
                        onChange={(e) => updateData({ employmentBarrierOther: toSentenceCase(e.target.value) })}
                        error={errors.employmentBarrierOther}
                    />
                )}
            </div>

            <div className="form-group-container">
                <RadioGroup
                    label="32. What factors do you believe will most help you secure employment?"
                    name="employmentFactor"
                    value={data.employmentFactor}
                    onChange={(value) => updateData({ employmentFactor: value })}
                    options={[
                        { value: 'Academic performance', label: 'Academic performance' },
                        { value: 'Internship experience', label: 'Internship experience' },
                        { value: 'Professional network', label: 'Professional network' },
                        { value: 'Technical skills', label: 'Technical skills' },
                        { value: 'Soft skills', label: 'Soft skills' },
                        { value: 'Family connections', label: 'Family connections' },
                        { value: 'Political connections', label: 'Political connections' },
                        { value: 'Other', label: 'Other' },
                    ]}
                    error={errors.employmentFactor}
                />
                {data.employmentFactor === 'Other' && (
                    <Input
                        label="Please specify:"
                        name="employmentFactorOther"
                        value={data.employmentFactorOther}
                        onChange={(e) => updateData({ employmentFactorOther: toSentenceCase(e.target.value) })}
                        error={errors.employmentFactorOther}
                    />
                )}
            </div>
        </div>
    );
};
