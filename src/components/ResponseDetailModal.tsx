import React from 'react';
import { X, User, BookOpen, Award, Target, Lightbulb, Search, AlertCircle, Printer } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import type { QuestionnaireData } from '../types';

interface ResponseDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: QuestionnaireData;
    submissionDate: string;
}

interface TabButtonProps {
    id: 'profile' | 'skills' | 'career';
    label: string;
    icon: any;
    isActive: boolean;
    onClick: (id: 'profile' | 'skills' | 'career') => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
        type="button"
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(id);
        }}
        className={`tab-btn ${isActive ? 'active' : ''}`}
    >
        <Icon className="icon-sm" />
        {label}
    </button>
);

export const ResponseDetailModal: React.FC<ResponseDetailModalProps> = ({ isOpen, onClose, data, submissionDate }) => {
    const [activeTab, setActiveTab] = React.useState<'profile' | 'skills' | 'career'>('profile');

    // Reset tab when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setActiveTab('profile');
        }
    }, [isOpen]);

    if (!isOpen || !data) return null;

    const handlePrint = () => {
        window.print();
    };

    const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <div className="section-header-row bg-blue-50/50 p-2 rounded-lg border border-blue-100">
            <Icon className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800 ml-2">{title}</h3>
        </div>
    );

    const Field = ({ label, value, fullWidth = false }: { label: string, value: string, fullWidth?: boolean }) => (
        <div className={`modal-field ${fullWidth ? 'col-span-full' : ''}`}>
            <p className="modal-label text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            <p className="modal-value text-gray-900 font-medium">{value || '-'}</p>
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Header */}
                <div className="modal-header no-print">
                    <div className="modal-header-top">
                        <div className="modal-title-group">
                            <h2>Submission Details</h2>
                            <p>Submitted on {new Date(submissionDate).toLocaleString()}</p>
                        </div>
                        <div className="modal-header-actions">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="btn-icon btn-print"
                                title="Print Submission"
                            >
                                <Printer className="icon-sm" />
                            </button>
                            <button onClick={onClose} className="btn-icon btn-close" type="button">
                                <X className="icon-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="modal-tabs">
                        <TabButton id="profile" label="Profile & Family" icon={User} isActive={activeTab === 'profile'} onClick={setActiveTab} />
                        <TabButton id="skills" label="Skills & Experience" icon={Award} isActive={activeTab === 'skills'} onClick={setActiveTab} />
                        <TabButton id="career" label="Career Plan" icon={Target} isActive={activeTab === 'career'} onClick={setActiveTab} />
                    </div>
                </div>

                {/* Print Header (Visible only when printing) */}
                <div className="print-only p-8 border-b border-gray-200 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Graduate Insights</h1>
                    <div className="flex justify-between text-sm text-gray-600">
                        <p>Student: <span className="font-semibold">{data.name}</span></p>
                        <p>Date: {new Date(submissionDate).toLocaleString()}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="modal-body custom-scrollbar">

                    {/* Top Summary Card */}
                    <div className="modal-summary-card no-print">
                        <div className="modal-summary-content">
                            <div className="modal-summary-info">
                                <h3>{data.name}</h3>
                                <div className="modal-summary-details">
                                    <span>{data.faculty}</span>
                                    <span className="dot">•</span>
                                    <span>{data.department}</span>
                                    <span className="dot">•</span>
                                    <span>Year {data.currentYear}</span>
                                </div>
                            </div>
                            <div className="modal-gpa-box">
                                <span className="modal-gpa-label">Current GPA</span>
                                <div className={`modal-gpa-value ${parseFloat(data.gpa) >= 4.0 ? 'high' : parseFloat(data.gpa) >= 3.0 ? 'mid' : parseFloat(data.gpa) >= 2.0 ? 'low' : 'fail'}`}>
                                    {data.gpa}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-sections-wrapper">
                        {/* TAB 1: Profile & Family */}
                        <div className={`modal-tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
                            {/* Section 1: Academic & Personal */}
                            <div className="break-inside-avoid">
                                <SectionHeader icon={User} title="Academic Information" />
                                <div className="modal-section-grid cols-3 mt-4">
                                    <Field label="Age" value={data.age} />
                                    <Field label="Gender" value={data.gender} />
                                    <Field label="Degree Program" value={data.degreeProgram} />
                                </div>
                            </div>

                            {/* Section 2: Family Background */}
                            <div className="break-inside-avoid">
                                <SectionHeader icon={BookOpen} title="Family Background" />
                                <div className="modal-section-grid mt-4">
                                    <Field label="Father's Education" value={data.fatherEducation} />
                                    <Field label="Mother's Education" value={data.motherEducation} />
                                    <Field label="Father's Occupation" value={data.fatherOccupation} />
                                    <Field label="Mother's Occupation" value={data.motherOccupation} />
                                    <Field label="Family Business" value={data.familyBusiness} />
                                    {data.familyBusiness === 'Yes' && <Field label="Business Type" value={data.familyBusinessType} />}
                                    <Field label="Financial Status" value={data.familyFinancialStability} />
                                </div>
                            </div>
                        </div>

                        {/* TAB 2: Skills & Experience */}
                        <div className={`modal-tab-content ${activeTab === 'skills' ? 'active' : ''}`}>
                            {/* Section 3: Skills & Competencies */}
                            <div className="break-inside-avoid">
                                <SectionHeader icon={Award} title="Skills & Competencies" />
                                <div className="modal-radar-grid mt-4">
                                    <div className="radar-container bg-gray-50">
                                        <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">Proficiency Radar</h4>
                                        <div className="radar-chart-wrapper flex justify-center">
                                            <RadarChart width={400} height={320} cx="50%" cy="50%" outerRadius="70%" data={[
                                                { subject: 'Technical', A: parseInt(data.skills?.technical || '0'), fullMark: 5 },
                                                { subject: 'Problem Solving', A: parseInt(data.skills?.problemSolving || '0'), fullMark: 5 },
                                                { subject: 'Communication', A: parseInt(data.skills?.communication || '0'), fullMark: 5 },
                                                { subject: 'Teamwork', A: parseInt(data.skills?.teamwork || '0'), fullMark: 5 },
                                                { subject: 'Digital Lit.', A: parseInt(data.skills?.digitalLiteracy || '0'), fullMark: 5 },
                                                { subject: 'Project Mgmt', A: parseInt(data.skills?.projectManagement || '0'), fullMark: 5 },
                                                { subject: 'Leadership', A: parseInt(data.skills?.leadership || '0'), fullMark: 5 },
                                            ]}>
                                                <PolarGrid stroke="#e5e7eb" />
                                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 11 }} />
                                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                                <Radar name="Skills" dataKey="A" stroke="#3b82f6" fill="#60a5fa" fillOpacity={0.5} />
                                            </RadarChart>
                                        </div>
                                    </div>
                                    <div className="radar-stats-list">
                                        <div className="mb-4 bg-white p-4 rounded-lg border border-gray-100">
                                            <h4 className="font-semibold text-gray-800 mb-3 text-xs uppercase tracking-wide border-b border-gray-100 pb-2">Raw Scores (1-5)</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Field label="Technical" value={data.skills?.technical || '0'} />
                                                <Field label="Problem Solving" value={data.skills?.problemSolving || '0'} />
                                                <Field label="Communication" value={data.skills?.communication || '0'} />
                                                <Field label="Teamwork" value={data.skills?.teamwork || '0'} />
                                                <Field label="Digital Lit." value={data.skills?.digitalLiteracy || '0'} />
                                                <Field label="Project Mgmt" value={data.skills?.projectManagement || '0'} />
                                                <Field label="Leadership" value={data.skills?.leadership || '0'} />
                                            </div>
                                        </div>
                                        <Field label="Internships Completed" value={data.internships} />
                                        <Field label="Professional Certifications" value={data.certifications} />
                                        {data.certifications === 'Yes' && <Field label="Certification Details" value={data.certificationsList} fullWidth />}
                                        <Field label="Awareness of Industry Trends" value={data.industryTrends} />
                                    </div>
                                </div>
                            </div>

                            {/* Section 5: Entrepreneurship */}
                            <div className="break-inside-avoid">
                                <SectionHeader icon={Lightbulb} title="Entrepreneurship Potential" />
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 mt-4 modal-section-grid print:bg-white print:border-gray-200">
                                    <div className="col-span-full mb-2">
                                        <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Self-Assessment Ratings (1-5)</h4>
                                    </div>
                                    <Field label="Skills Confidence" value={data.entrepreneurship?.skills || 'N/A'} />
                                    <Field label="Opportunity ID" value={data.entrepreneurship?.opportunities || 'N/A'} />
                                    <Field label="Resilience" value={data.entrepreneurship?.challenges || 'N/A'} />
                                    <Field label="Resource Access" value={data.entrepreneurship?.resources || 'N/A'} />
                                    <Field label="Risk Tolerance" value={data.entrepreneurship?.risks || 'N/A'} />
                                </div>
                            </div>
                        </div>

                        {/* TAB 3: Career Plan */}
                        <div className={`modal-tab-content ${activeTab === 'career' ? 'active' : ''}`}>
                            {/* Section 4: Career Intentions */}
                            <div className="break-inside-avoid">
                                <SectionHeader icon={Target} title="Career Intentions" />
                                <div className="modal-section-grid mt-4">
                                    <Field label="Primary Career Goal" value={data.careerGoal === 'Other' ? data.careerGoalOther : data.careerGoal} fullWidth />
                                    <Field label="Employer Preference" value={data.employerPreference} />
                                    <Field label="Expected Salary Range" value={data.salaryRange} />
                                    <Field label="Relocation Willingness" value={data.relocation} />
                                    <Field label="Job Stability Importance" value={data.jobStability} />
                                </div>
                            </div>

                            {/* Section 6: Job Search & Enablers */}
                            <div className="break-inside-avoid modal-jobs-grid mt-4">
                                <div>
                                    <SectionHeader icon={Search} title="Job Search Readiness" />
                                    <div className="space-y-4 mt-4">
                                        <Field label="Career Services Usage" value={data.careerServices} />
                                        <Field label="Professional Network" value={data.professionalNetwork} />
                                        <Field label="University Preparation" value={data.universityPreparation} />
                                    </div>
                                </div>
                                <div>
                                    <SectionHeader icon={AlertCircle} title="Barriers & Success Factors" />
                                    <div className="space-y-4 mt-4">
                                        <Field label="Biggest Perceived Barrier" value={data.employmentBarrier === 'Other' ? data.employmentBarrierOther : data.employmentBarrier} />
                                        <Field label="Top Success Factor" value={data.employmentFactor === 'Other' ? data.employmentFactorOther : data.employmentFactor} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer print:hidden">
                    <button onClick={onClose} className="btn btn-primary px-6">Close</button>
                </div>
            </div>
        </div>
    );
};
