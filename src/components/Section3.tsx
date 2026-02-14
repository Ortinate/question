import React from 'react';
import type { QuestionnaireData } from '../types';
import { LikertScale } from './LikertScale';
import { RadioGroup } from './RadioGroup';
import { Input } from './Input';
import { Select } from './Select';

interface SectionProps {
    data: QuestionnaireData;
    updateData: (fields: Partial<QuestionnaireData>) => void;
    errors: Record<string, string>;
}

export const Section3: React.FC<SectionProps> = ({ data, updateData, errors }) => {
    const updateSkills = (skill: keyof QuestionnaireData['skills'], value: string) => {
        updateData({
            skills: {
                ...data.skills,
                [skill]: value,
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };


    return (
        <div className="section-container">
            <div>
                <h2 className="section-title">Section 3: Skills & Competencies</h2>
                <p className="section-subtitle">To gauge readiness for employment.</p>
            </div>

            <div className="subsection-card">
                <h3 className="subsection-title">14. Rate your proficiency in the following:</h3>
                <p className="subsection-description">(1 = Poor, 5 = Excellent)</p>

                <LikertScale
                    label="Technical skills related to your field"
                    name="skills.technical"
                    value={data.skills.technical}
                    onChange={(val) => updateSkills('technical', val)}
                    error={errors['skills.technical']}
                />
                <LikertScale
                    label="Problem-solving abilities"
                    name="skills.problemSolving"
                    value={data.skills.problemSolving}
                    onChange={(val) => updateSkills('problemSolving', val)}
                    error={errors['skills.problemSolving']}
                />
                <LikertScale
                    label="Communication skills"
                    name="skills.communication"
                    value={data.skills.communication}
                    onChange={(val) => updateSkills('communication', val)}
                    error={errors['skills.communication']}
                />
                <LikertScale
                    label="Teamwork & collaboration"
                    name="skills.teamwork"
                    value={data.skills.teamwork}
                    onChange={(val) => updateSkills('teamwork', val)}
                    error={errors['skills.teamwork']}
                />
                <LikertScale
                    label="Digital literacy (software/tools)"
                    name="skills.digitalLiteracy"
                    value={data.skills.digitalLiteracy}
                    onChange={(val) => updateSkills('digitalLiteracy', val)}
                    error={errors['skills.digitalLiteracy']}
                />
                <LikertScale
                    label="Project management"
                    name="skills.projectManagement"
                    value={data.skills.projectManagement}
                    onChange={(val) => updateSkills('projectManagement', val)}
                    error={errors['skills.projectManagement']}
                />
                <LikertScale
                    label="Leadership skills"
                    name="skills.leadership"
                    value={data.skills.leadership}
                    onChange={(val) => updateSkills('leadership', val)}
                    error={errors['skills.leadership']}
                />
            </div>

            <RadioGroup
                label="15. Have you completed any internships or industrial training in the last 24 months?"
                name="internships"
                value={data.internships}
                onChange={(value) => updateData({ internships: value })}
                options={[
                    { value: 'Yes, multiple', label: 'Yes, multiple' },
                    { value: 'Yes, one', label: 'Yes, one' },
                    { value: 'No', label: 'No' },
                ]}
                error={errors.internships}
            />

            <div className="form-group-container">
                <RadioGroup
                    label="16. Do you have any professional certifications (e.g., AWS, Cisco, AutoCAD, Six Sigma)?"
                    name="certifications"
                    value={data.certifications}
                    onChange={(value) => updateData({ certifications: value })}
                    options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                    ]}
                    error={errors.certifications}
                />
                {data.certifications === 'Yes' && (
                    <Input
                        label="Please list:"
                        name="certificationsList"
                        value={data.certificationsList}
                        onChange={handleChange}
                        placeholder="e.g. AWS Certified Solutions Architect"
                        error={errors.certificationsList}
                    />
                )}
            </div>

            <Select
                label="17. How would you rate your familiarity with current industry trends in your field?"
                name="industryTrends"
                value={data.industryTrends}
                onChange={handleChange}
                options={[
                    { value: 'Highly familiar', label: 'Highly familiar' },
                    { value: 'Moderately familiar', label: 'Moderately familiar' },
                    { value: 'Neither familiar nor not familiar', label: 'Neither familiar nor not familiar' },
                    { value: 'Slightly familiar', label: 'Slightly familiar' },
                    { value: 'Not familiar', label: 'Not familiar' },
                ]}
                error={errors.industryTrends}
            />
        </div>
    );
};
