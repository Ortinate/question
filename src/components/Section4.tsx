import React from 'react';
import type { QuestionnaireData } from '../types';
import { RadioGroup } from './RadioGroup';
import { Select } from './Select';
import { Input } from './Input';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section4: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    return (
        <div className="section-container">
            <div>
                <h2 className="section-title">Section 4: Career Intentions & Employment Preferences</h2>
                <p className="section-subtitle">To determine likely employment type.</p>
            </div>

            <div className="form-group-container">
                <RadioGroup
                    label="18. What is your primary career goal after graduation?"
                    name="careerGoal"
                    value={data.careerGoal}
                    onChange={(value) => updateData({ careerGoal: value })}
                    options={[
                        { value: 'Employment in a company/organization', label: 'Employment in a company/organization' },
                        { value: 'Self-employment/Starting a business', label: 'Self-employment/Starting a business' },
                        { value: 'Further studies', label: 'Further studies (e.g., Btech, Masters, PhD)' },
                        { value: 'Undecided', label: 'Undecided' },
                        { value: 'Other', label: 'Other' },
                    ]}
                    error={errors.careerGoal}
                />
                {data.careerGoal === 'Other' && (
                    <Input
                        label="Please specify:"
                        name="careerGoalOther"
                        value={data.careerGoalOther}
                        onChange={handleChange}
                        error={errors.careerGoalOther}
                    />
                )}
            </div>

            <div className="form-group-container">
                <label className="label">19. If seeking employment, what type of employer do you prefer?</label>
                <Select
                    label="Employer Type"
                    name="employerPreference"
                    value={data.employerPreference}
                    onChange={handleChange}
                    options={[
                        { value: 'Multinational corporation (MNC)', label: 'Multinational corporation (MNC)' },
                        { value: 'Small or medium-sized enterprise (SME)', label: 'Small or medium-sized enterprise (SME)' },
                        { value: 'Government/public sector', label: 'Government/public sector' },
                        { value: 'Non-governmental organization (NGO)', label: 'Non-governmental organization (NGO)' },
                        { value: 'Startup', label: 'Startup' },
                        { value: 'No preference', label: 'No preference' },
                    ]}
                    error={errors.employerPreference}
                />
            </div>

            <Select
                label="20. What is your expected salary range (per annum) for your first job?"
                name="salaryRange"
                value={data.salaryRange}
                onChange={handleChange}
                options={[
                    { value: 'Below ₵5,000', label: 'Below ₵5,000' },
                    { value: '₵5,000 – ₵10,000', label: '₵5,000 – ₵10,000' },
                    { value: '₵10,001 – ₵15,000', label: '₵10,001 – ₵15,000' },
                    { value: 'Above ₵15,000', label: 'Above ₵15,000' },
                ]}
                error={errors.salaryRange}
            />

            <RadioGroup
                label="21. Are you willing to relocate for a job?"
                name="relocation"
                value={data.relocation}
                onChange={(value) => updateData({ relocation: value })}
                options={[
                    { value: 'Yes, anywhere', label: 'Yes, anywhere' },
                    { value: 'Only within my country', label: 'Only within my country' },
                    { value: 'Only within my region', label: 'Only within my region' },
                    { value: 'Only within my district', label: 'Only within my district' },
                    { value: 'No', label: 'No' },
                ]}
                error={errors.relocation}
            />

            <RadioGroup
                label="22. How important is job stability to you?"
                name="jobStability"
                value={data.jobStability}
                onChange={(value) => updateData({ jobStability: value })}
                options={[
                    { value: 'Extremely important', label: 'Extremely important' },
                    { value: 'Important', label: 'Important' },
                    { value: 'Neutral', label: 'Neutral' },
                    { value: 'Not important', label: 'Not important' },
                    { value: 'Extremely not Important', label: 'Extremely not Important' },
                ]}
                error={errors.jobStability}
            />
        </div>
    );
};
