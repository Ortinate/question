import React, { useState } from 'react';
import { initialData } from '../types';
import type { QuestionnaireData } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';
import { Section4 } from './Section4';
import { Section5 } from './Section5';
import { Section6 } from './Section6';
import { Section7 } from './Section7';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2 } from 'lucide-react';

export const QuestionnaireForm: React.FC = () => {
    const [data, setData] = useState<QuestionnaireData>(initialData);
    const [currentSection, setCurrentSection] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const totalSections = 7;

    const updateData = (fields: Partial<QuestionnaireData>) => {
        setData((prev) => ({ ...prev, ...fields }));
        // Clear errors for fields that are updated
        if (Object.keys(errors).length > 0) {
            const newErrors = { ...errors };
            Object.keys(fields).forEach(key => delete newErrors[key]);
            setErrors(newErrors);
        }
    };

    const validateSection = (section: number): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (section === 1) {
            if (!data.name.trim()) newErrors.name = 'Name is required';
            if (!data.indexNumber.trim()) newErrors.indexNumber = 'Index Number is required';
            if (!data.age) newErrors.age = 'Age is required';
            if (!data.gender) newErrors.gender = 'Gender is required';
            if (!data.faculty) newErrors.faculty = 'Faculty is required';
            if (!data.department) newErrors.department = 'Department is required';
            if (!data.degreeProgram) newErrors.degreeProgram = 'Degree Program is required';
            if (!data.currentYear) newErrors.currentYear = 'Current Year is required';
            if (!data.gpa) {
                newErrors.gpa = 'GPA is required';
            } else {
                const gpaVal = parseFloat(data.gpa);
                if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 5.0) {
                    newErrors.gpa = 'GPA must be between 0.0 and 5.0';
                }
            }
        }

        if (section === 2) {
            if (!data.fatherEducation) newErrors.fatherEducation = 'Father\'s education is required';
            if (!data.motherEducation) newErrors.motherEducation = 'Mother\'s education is required';
            if (!data.fatherOccupation) newErrors.fatherOccupation = 'Father\'s occupation is required';
            if (!data.motherOccupation) newErrors.motherOccupation = 'Mother\'s occupation is required';
            if (!data.familyBusiness) newErrors.familyBusiness = 'This field is required';
            if (data.familyBusiness === 'Yes' && !data.familyBusinessType) newErrors.familyBusinessType = 'Please specify the business type';
            if (!data.familySelfEmployed) newErrors.familySelfEmployed = 'This field is required';
            if (!data.familyFinancialStability) newErrors.familyFinancialStability = 'This field is required';
            if (!data.familyFinancialSupport) newErrors.familyFinancialSupport = 'This field is required';
        }

        if (section === 3) {
            if (!data.skills.technical) newErrors['skills.technical'] = 'Required';
            if (!data.skills.problemSolving) newErrors['skills.problemSolving'] = 'Required';
            if (!data.skills.communication) newErrors['skills.communication'] = 'Required';
            if (!data.skills.teamwork) newErrors['skills.teamwork'] = 'Required';
            if (!data.skills.digitalLiteracy) newErrors['skills.digitalLiteracy'] = 'Required';
            if (!data.skills.projectManagement) newErrors['skills.projectManagement'] = 'Required';
            if (!data.skills.leadership) newErrors['skills.leadership'] = 'Required';
            if (!data.internships) newErrors.internships = 'This field is required';
            if (!data.certifications) newErrors.certifications = 'This field is required';
            if (data.certifications === 'Yes' && !data.certificationsList) newErrors.certificationsList = 'Please list your certifications';
            if (!data.industryTrends) newErrors.industryTrends = 'This field is required';
        }

        if (section === 4) {
            if (!data.careerGoal) newErrors.careerGoal = 'This field is required';
            if (data.careerGoal === 'Other' && !data.careerGoalOther) newErrors.careerGoalOther = 'Please specify';
            if (!data.employerPreference) newErrors.employerPreference = 'This field is required';
            if (!data.salaryRange) newErrors.salaryRange = 'This field is required';
            if (!data.relocation) newErrors.relocation = 'This field is required';
            if (!data.jobStability) newErrors.jobStability = 'This field is required';
        }

        if (section === 5) {
            if (!data.entrepreneurship.skills) newErrors['entrepreneurship.skills'] = 'Required';
            if (!data.entrepreneurship.opportunities) newErrors['entrepreneurship.opportunities'] = 'Required';
            if (!data.entrepreneurship.challenges) newErrors['entrepreneurship.challenges'] = 'Required';
            if (!data.entrepreneurship.resources) newErrors['entrepreneurship.resources'] = 'Required';
            if (!data.entrepreneurship.risks) newErrors['entrepreneurship.risks'] = 'Required';
        }

        if (section === 6) {
            if (!data.careerServices) newErrors.careerServices = 'This field is required';
            if (!data.professionalNetwork) newErrors.professionalNetwork = 'This field is required';
            if (!data.universityPreparation) newErrors.universityPreparation = 'This field is required';
        }

        if (section === 7) {
            if (!data.employmentBarrier) newErrors.employmentBarrier = 'This field is required';
            if (data.employmentBarrier === 'Other' && !data.employmentBarrierOther) newErrors.employmentBarrierOther = 'Please specify';
            if (!data.employmentFactor) newErrors.employmentFactor = 'This field is required';
            if (data.employmentFactor === 'Other' && !data.employmentFactorOther) newErrors.employmentFactorOther = 'Please specify';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
            // Scroll to the first error
            const firstErrorField = document.querySelector('.input-error, .select-error, .border-red-500');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            setErrors({});
        }

        return isValid;
    };

    const handleNext = () => {
        if (validateSection(currentSection)) {
            if (currentSection < totalSections) {
                setCurrentSection((prev) => prev + 1);
                window.scrollTo(0, 0);
            } else {
                handleSubmit();
            }
        }
    };

    const handlePrev = () => {
        if (currentSection > 1) {
            setCurrentSection((prev) => prev - 1);
            setErrors({}); // Clear errors when going back
            window.scrollTo(0, 0);
        }
    };



    const handleSubmit = async () => {
        if (!validateSection(currentSection)) return;

        setIsSubmitting(true);

        try {
            // Check for duplicates (by Index Number)
            if (data.indexNumber) {
                const { data: existing } = await supabase
                    .from('questionnaire_responses')
                    .select('id')
                    .filter('data->>indexNumber', 'eq', data.indexNumber)
                    .single();

                if (existing) {
                    alert(`A submission with Index Number "${data.indexNumber}" already exists.`);
                    setIsSubmitting(false);
                    return;
                }
            }

            const { error } = await supabase
                .from('questionnaire_responses')
                .insert([{ data: data }]);

            if (error) throw error;

            setSubmitted(true);
            window.scrollTo(0, 0);

        } catch (err) {
            console.error('Submission error:', err);

            // Fallback for demo/local if supabase fails
            try {
                const existing = localStorage.getItem('questionnaire_submissions');
                const submissions = existing ? JSON.parse(existing) : [];
                submissions.push({ id: Date.now(), created_at: new Date().toISOString(), data });
                localStorage.setItem('questionnaire_submissions', JSON.stringify(submissions));
                setSubmitted(true);
                window.scrollTo(0, 0);
            } catch (localErr) {
                alert('Failed to submit. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="submission-container">
                <div className="submission-icon-wrapper">
                    <CheckCircle className="submission-icon" />
                </div>
                <h2 className="submission-title">Submission Successful!</h2>
                <p className="submission-text">Thank you for participating in the Graduate Employability Assessment.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary"
                >
                    Submit Another Response
                </button>
            </div>
        );
    }

    const renderSection = () => {
        return (
            <div key={currentSection} className="animate-slide-in-right">
                {(() => {
                    switch (currentSection) {
                        case 1: return <Section1 data={data} updateData={updateData} errors={errors} />;
                        case 2: return <Section2 data={data} updateData={updateData} errors={errors} />;
                        case 3: return <Section3 data={data} updateData={updateData} errors={errors} />;
                        case 4: return <Section4 data={data} updateData={updateData} errors={errors} />;
                        case 5: return <Section5 data={data} updateData={updateData} errors={errors} />;
                        case 6: return <Section6 data={data} updateData={updateData} errors={errors} />;
                        case 7: return <Section7 data={data} updateData={updateData} errors={errors} />;
                        default: return null;
                    }
                })()}
            </div>
        );
    };

    const progress = (currentSection / totalSections) * 100;

    return (
        <div className="form-wrapper">
            <div className="progress-container">
                <div className="progress-text">
                    <span>Section {currentSection} of {totalSections}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <div className="progress-bar-bg">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="form-card">
                {renderSection()}
            </div>

            <div className="form-navigation">
                <button
                    onClick={handlePrev}
                    disabled={currentSection === 1}
                    className={`btn btn-secondary ${currentSection === 1 ? 'btn-disabled' : ''}`}
                >
                    <ChevronLeft className="icon-sm" /> Previous
                </button>

                <button
                    onClick={handleNext}
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="icon-sm animate-spin mr-2" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            {currentSection === totalSections ? 'Submit Survey' : 'Next Step'}
                            {currentSection !== totalSections && <ChevronRight className="icon-sm ml-2" />}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
