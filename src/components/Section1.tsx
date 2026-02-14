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

export const Section1: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    return (
        <div className="section-container">
            <h2 className="section-title">Section 1: Demographic & Educational Background</h2>

            <Input
                label="1. Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
            />

            <div className="form-grid">
                <Input
                    label="2. Age in years"
                    name="age"
                    type="number"
                    value={data.age}
                    onChange={handleChange}
                    placeholder="e.g. 23"
                    error={errors.age}
                />

                <Select
                    label="3. Gender"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        { value: 'Other', label: 'Other' },
                    ]}
                    error={errors.gender}
                />
            </div>

            <div className="form-grid">
                <Input
                    label="4. Faculty"
                    name="faculty"
                    value={data.faculty}
                    onChange={handleChange}
                    placeholder="e.g. Engineering"
                    error={errors.faculty}
                />

                <Input
                    label="5. Department"
                    name="department"
                    value={data.department}
                    onChange={handleChange}
                    placeholder="e.g. Civil Engineering"
                    error={errors.department}
                />
            </div>

            <RadioGroup
                label="6. Degree Program"
                name="degreeProgram"
                value={data.degreeProgram}
                onChange={(value) => updateData({ degreeProgram: value })}
                options={[
                    { value: 'Certificate', label: 'Certificate' },
                    { value: 'Diploma', label: 'Diploma' },
                    { value: 'HND', label: 'HND' },
                    { value: 'Btech', label: 'Btech' },
                    { value: 'Mtech', label: 'Mtech' },
                    { value: 'DTech', label: 'DTech' },
                ]}
                error={errors.degreeProgram}
            />

            <div className="form-grid">
                <Select
                    label="7. Current Year of Study"
                    name="currentYear"
                    value={data.currentYear}
                    onChange={handleChange}
                    options={[
                        { value: '1', label: 'Year 1' },
                        { value: '2', label: 'Year 2' },
                        { value: '3', label: 'Year 3' },
                        { value: '4', label: 'Year 4' },
                    ]}
                    error={errors.currentYear}
                />

                <Input
                    label="8. Current GPA/Cumulative Grade"
                    name="gpa"
                    value={data.gpa}
                    onChange={handleChange}
                    placeholder="e.g. 3.5"
                    error={errors.gpa}
                />
            </div>
        </div>
    );
};
