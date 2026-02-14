// List of Faculties and Departments at Takoradi Technical University (TTU)
// Used for Autocomplete Suggestions

export const ttuFaculties = [
    "Faculty of Applied Arts and Technology",
    "Faculty of Applied Sciences",
    "Faculty of Built and Natural Environment",
    "Faculty of Business Studies",
    "Faculty of Engineering",
    "Faculty of Health and Allied Sciences",
    "School of Graduate Studies",
    "Centre for Languages and Liberal Studies"
];

// Mapping of Faculties to valid Departments
export const ttuStructure: Record<string, string[]> = {
    "Faculty of Engineering": [
        "Civil Engineering",
        "Mechanical Engineering",
        "Electrical and Electronic Engineering",
        "Automotive Engineering",
        "Chemical Engineering",
        "Renewable Energy Engineering",
        "Petroleum Engineering",
        "Welding and Fabrication Engineering"
    ],
    "Faculty of Applied Arts and Technology": [
        "Graphic Design Technology",
        "Ceramics Technology",
        "Textiles Design and Technology",
        "Fashion Design and Technology",
        "Sculpture and Industrial Painting"
    ],
    "Faculty of Applied Sciences": [
        "Computer Science",
        "Information and Communication Technology (ICT)",
        "Statistics and Actuarial Science",
        "Hotel, Catering and Institutional Management",
        "Mathematics",
        "Science Laboratory Technology",
        "Tourism Management"
    ],
    "Faculty of Business Studies": [
        "Accounting",
        "Marketing",
        "Procurement and Supply Chain Management",
        "Secretaryship and Management Studies",
        "Liberal Studies",
        "Purchasing and Supply"
    ],
    "Faculty of Built and Natural Environment": [
        "Building Technology",
        "Construction Engineering and Management",
        "Interior Design and Technology",
        "Real Estate Management",
        "Plumbing and Gas Technology",
        "Wood Technology",
        "Architectural Drafting"
    ],
    "Faculty of Health and Allied Sciences": [
        "Medical Laboratory Technology",
        "Dispensing Technology",
        "Biomedical Engineering"
    ],
    "School of Graduate Studies": [
        "MTech in Civil Engineering",
        "MTech in Graphic Design"
    ],
    "Centre for Languages and Liberal Studies": [
        "Liberal Studies",
        "African Studies",
        "Communication Skills"
    ]
};

// Fallback list of ALL departments (compiled from structure)
export const ttuDepartments = Object.values(ttuStructure).flat();
