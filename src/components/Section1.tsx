import React from 'react';
import type { QuestionnaireData } from '../types';
import { Input } from './Input';
import { Select } from './Select';
import { RadioGroup } from './RadioGroup';
import { ttuFaculties, ttuStructure, ttuDepartments as allDepts } from '../data/ttuList';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section1: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    // Auto-capitalize first letter of each word (Smart Formatting)
    const toTitleCase = (value: string) => {
        return value.replace(/\b\w/g, char => char.toUpperCase());
    };

    // Get available departments based on selected faculty
    // If faculty is not in our list (custom), show ALL departments as fallback
    const availableDepartments = ttuStructure[data.faculty] || allDepts;

    return (
        <div className="section-container">
            <h2 className="section-title">Section 1: Demographic & Educational Background</h2>

            <Input
                label="1. Name"
                name="name"
                value={data.name}
                onChange={(e) => updateData({ name: toTitleCase(e.target.value) })}
                placeholder="Enter your full name"
                error={errors.name}
            />

            <Input
                label="2. Student Index Number"
                name="indexNumber"
                value={data.indexNumber}
                onChange={(e) => updateData({ indexNumber: e.target.value.toUpperCase() })}
                placeholder="e.g. 0123456789"
                error={errors.indexNumber}
            />

            <div className="form-grid">
                <Input
                    label="3. Age in years"
                    name="age"
                    type="number"
                    value={data.age}
                    onChange={handleChange}
                    placeholder="e.g. 23"
                    error={errors.age}
                />

                <Select
                    label="4. Gender"
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
                    label="5. Faculty"
                    name="faculty"
                    value={data.faculty}
                    onChange={(e) => updateData({ faculty: toTitleCase(e.target.value) })}
                    placeholder="e.g. Engineering"
                    error={errors.faculty}
                    list="faculty-list"
                />
                <datalist id="faculty-list">
                    {ttuFaculties.map((faculty) => (
                        <option key={faculty} value={faculty} />
                    ))}
                </datalist>

                <Input
                    label="6. Department"
                    name="department"
                    value={data.department}
                    onChange={(e) => updateData({ department: toTitleCase(e.target.value) })}
                    placeholder={data.faculty ? `Select from ${data.faculty}...` : "e.g. Civil Engineering"}
                    error={errors.department}
                    list="department-list"
                />
                <datalist id="department-list">
                    {availableDepartments.map((dept) => (
                        <option key={dept} value={dept} />
                    ))}
                </datalist>
            </div>

            <RadioGroup
                label="7. Degree Program"
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
                    label="8. Current Year of Study"
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
                    label="9. Current GPA/Cumulative Grade"
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
