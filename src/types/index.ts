export interface QuestionnaireData {
    // Section 1: Demographic & Educational Background
    name: string;
    age: string;
    gender: string;
    faculty: string;
    department: string;
    degreeProgram: string;
    currentYear: string;
    gpa: string;

    // Section 2: Family Background & Socioeconomic Factors
    fatherEducation: string;
    motherEducation: string;
    fatherOccupation: string;
    motherOccupation: string;
    familyBusiness: string;
    familyBusinessType: string;
    familySelfEmployed: string;
    familyFinancialStability: string;
    familyFinancialSupport: string;

    // Section 3: Skills & Competencies
    skills: {
        technical: string;
        problemSolving: string;
        communication: string;
        teamwork: string;
        digitalLiteracy: string;
        projectManagement: string;
        leadership: string;
    };
    internships: string;
    certifications: string;
    certificationsList: string;
    industryTrends: string;

    // Section 4: Career Intentions & Employment Preferences
    careerGoal: string;
    careerGoalOther: string;
    employerPreference: string;
    salaryRange: string;
    relocation: string;
    jobStability: string;

    // Section 5: Entrepreneurship Self-Efficacy (Likert 1-5)
    entrepreneurship: {
        skills: string;
        opportunities: string;
        challenges: string;
        resources: string;
        risks: string;
    };

    // Section 6: Job Search Preparedness & Support
    careerServices: string;
    professionalNetwork: string;
    universityPreparation: string;

    // Section 7: Perceived Barriers & Enablers
    employmentBarrier: string;
    employmentBarrierOther: string;
    employmentFactor: string;
    employmentFactorOther: string;
}

export const initialData: QuestionnaireData = {
    name: '',
    age: '',
    gender: '',
    faculty: '',
    department: '',
    degreeProgram: '',
    currentYear: '',
    gpa: '',
    fatherEducation: '',
    motherEducation: '',
    fatherOccupation: '',
    motherOccupation: '',
    familyBusiness: '',
    familyBusinessType: '',
    familySelfEmployed: '',
    familyFinancialStability: '',
    familyFinancialSupport: '',
    skills: {
        technical: '',
        problemSolving: '',
        communication: '',
        teamwork: '',
        digitalLiteracy: '',
        projectManagement: '',
        leadership: '',
    },
    internships: '',
    certifications: '',
    certificationsList: '',
    industryTrends: '',
    careerGoal: '',
    careerGoalOther: '',
    employerPreference: '',
    salaryRange: '',
    relocation: '',
    jobStability: '',
    entrepreneurship: {
        skills: '',
        opportunities: '',
        challenges: '',
        resources: '',
        risks: '',
    },
    careerServices: '',
    professionalNetwork: '',
    universityPreparation: '',
    employmentBarrier: '',
    employmentBarrierOther: '',
    employmentFactor: '',
    employmentFactorOther: '',
};
