import React from 'react';
import { X, User, BookOpen, Award, Target, Lightbulb, Search, AlertCircle, Printer } from 'lucide-react';
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
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none ${isActive
            ? 'border-blue-600 text-blue-600 bg-blue-50/50'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
    >
        <Icon className="w-4 h-4" />
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

    if (!isOpen) return null;

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
        <div className="modal-overlay print:bg-white print:p-0 print:static print:block">
            <div className="modal-content print:shadow-none print:border-none print:max-w-none print:w-full print:h-auto print:overflow-visible">
                {/* Header */}
                <div
                    className="modal-header no-print pb-0 border-b-0 flex-col items-start gap-4"
                    style={{ alignItems: 'flex-start', flexDirection: 'column' }}
                >
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Submission Details</h2>
                            <p className="text-sm text-gray-500">Submitted on {new Date(submissionDate).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Print Submission"
                            >
                                <Printer className="w-5 h-5" />
                            </button>
                            <button onClick={onClose} className="modal-close-btn" type="button">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 border-b border-gray-200 w-full overflow-x-auto">
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
                <div className="modal-body custom-scrollbar print:p-8 print:overflow-visible">

                    {/* Top Summary Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-8 no-print">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{data.name}</h3>
                                <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                    <span>{data.faculty}</span>
                                    <span>•</span>
                                    <span>{data.department}</span>
                                    <span>•</span>
                                    <span>Year {data.currentYear}</span>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-blue-100">
                                <span className="text-xs text-gray-500 uppercase font-bold">Current GPA</span>
                                <div className={`text-2xl font-bold ${parseFloat(data.gpa) >= 4.0 ? 'text-green-600' : parseFloat(data.gpa) >= 3.0 ? 'text-blue-600' : parseFloat(data.gpa) >= 2.0 ? 'text-orange-600' : 'text-gray-600'}`}>
                                    {data.gpa}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* TAB 1: Profile & Family */}
                        <div className={`${activeTab === 'profile' ? 'block' : 'hidden'} print:block space-y-8`}>
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
                        <div className={`${activeTab === 'skills' ? 'block' : 'hidden'} print:block space-y-8`}>
                            {/* Section 3: Skills & Competencies */}
                            <div className="break-inside-avoid">
                                <SectionHeader icon={Award} title="Skills & Competencies" />
                                <div className="mt-4 grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 print:bg-white print:border-gray-200">
                                        <h4 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">Proficiency Ratings (1-5)</h4>
                                        <div className="space-y-3">
                                            {[
                                                { l: 'Technical', v: data.skills.technical },
                                                { l: 'Problem Solving', v: data.skills.problemSolving },
                                                { l: 'Communication', v: data.skills.communication },
                                                { l: 'Teamwork', v: data.skills.teamwork },
                                                { l: 'Digital Literacy', v: data.skills.digitalLiteracy },
                                                { l: 'Project Mgmt', v: data.skills.projectManagement },
                                                { l: 'Leadership', v: data.skills.leadership },
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">{item.l}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-500 rounded-full"
                                                                style={{ width: `${(parseInt(item.v) / 5) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-bold text-sm w-4 text-right">{item.v}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
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
                                    <Field label="Skills Confidence" value={data.entrepreneurship.skills} />
                                    <Field label="Opportunity ID" value={data.entrepreneurship.opportunities} />
                                    <Field label="Resilience" value={data.entrepreneurship.challenges} />
                                    <Field label="Resource Access" value={data.entrepreneurship.resources} />
                                    <Field label="Risk Tolerance" value={data.entrepreneurship.risks} />
                                </div>
                            </div>
                        </div>

                        {/* TAB 3: Career Plan */}
                        <div className={`${activeTab === 'career' ? 'block' : 'hidden'} print:block space-y-8`}>
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
                            <div className="break-inside-avoid grid md:grid-cols-2 gap-8">
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
