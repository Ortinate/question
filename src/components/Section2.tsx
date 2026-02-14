import React from 'react';
import type { QuestionnaireData } from '../types';
import { Input } from './Input';
import { Select } from './Select';
import { RadioGroup } from './RadioGroup';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section2: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    const eduOptions = [
        { value: 'No formal education', label: 'No formal education' },
        { value: 'High School', label: 'High School' },
        { value: 'Diploma', label: 'Diploma' },
        { value: 'Bachelor’s Degree', label: 'Bachelor’s Degree' },
        { value: 'Postgraduate Degree', label: 'Postgraduate Degree' },
    ];

    return (
        <div className="section-container">
            <h2 className="section-title">Section 2: Family Background & Socioeconomic Factors</h2>
            <p className="section-subtitle">To assess the influence of family background on career pathways:</p>

            <div className="subsection-card">
                <h3 className="subsection-title">8. Highest educational qualification of your parents/guardians</h3>
                <div className="form-grid">
                    <Select
                        label="Father"
                        name="fatherEducation"
                        value={data.fatherEducation}
                        onChange={handleChange}
                        options={eduOptions}
                        error={errors.fatherEducation}
                    />
                    <Select
                        label="Mother"
                        name="motherEducation"
                        value={data.motherEducation}
                        onChange={handleChange}
                        options={eduOptions}
                        error={errors.motherEducation}
                    />
                </div>
            </div>

            <div className="form-grid">
                <Input
                    label="9a. Father's Occupation"
                    name="fatherOccupation"
                    value={data.fatherOccupation}
                    onChange={handleChange}
                    placeholder="e.g. Farmer, Teacher"
                    error={errors.fatherOccupation}
                />
                <Input
                    label="9b. Mother's Occupation"
                    name="motherOccupation"
                    value={data.motherOccupation}
                    onChange={handleChange}
                    placeholder="e.g. Trader, Nurse"
                    error={errors.motherOccupation}
                />
            </div>

            <div className="form-group-container">
                <RadioGroup
                    label="10. Does your family own a business?"
                    name="familyBusiness"
                    value={data.familyBusiness}
                    onChange={(value) => updateData({ familyBusiness: value })}
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                    ]}
                    error={errors.familyBusiness}
                />

                {data.familyBusiness === 'Yes' && (
                    <Input
                        label="10c. If yes, what type?"
                        name="familyBusinessType"
                        value={data.familyBusinessType}
                        onChange={handleChange}
                        placeholder="e.g. Retail shop"
                        error={errors.familyBusinessType}
                    />
                )}
            </div>

            <RadioGroup
                label="11. Have any family members been self-employed or entrepreneurs?"
                name="familySelfEmployed"
                value={data.familySelfEmployed}
                onChange={(value) => updateData({ familySelfEmployed: value })}
                options={[
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' },
                ]}
                error={errors.familySelfEmployed}
            />

            <Select
                label="12. How would you describe your family’s financial stability?"
                name="familyFinancialStability"
                value={data.familyFinancialStability}
                onChange={handleChange}
                options={[
                    { value: 'Highly stable', label: 'Highly stable' },
                    { value: 'Moderately stable', label: 'Moderately stable' },
                    { value: 'Neutral', label: 'Neutral' },
                    { value: 'Somewhat unstable', label: 'Somewhat unstable' },
                    { value: 'Highly unstable', label: 'Highly unstable' },
                ]}
                error={errors.familyFinancialStability}
            />

            <Select
                label="13. Has your family been able to support you financially during your studies?"
                name="familyFinancialSupport"
                value={data.familyFinancialSupport}
                onChange={handleChange}
                options={[
                    { value: 'Fully', label: 'Fully' },
                    { value: 'Partially', label: 'Partially' },
                    { value: 'Minimally', label: 'Minimally' },
                    { value: 'Not at all', label: 'Not at all' },
                ]}
                error={errors.familyFinancialSupport}
            />
        </div>
    );
};
