import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { QuestionnaireData } from '../types';
import { Download, RefreshCw, LogOut, Search, Trash2, ChevronLeft, ChevronRight, Star, ArrowUpDown } from 'lucide-react';
import { ResponseDetailModal } from './ResponseDetailModal';
import { FacultyBarChart } from './charts/FacultyBarChart';
import { CareerIntentionsPieChart } from './charts/CareerIntentionsPieChart';
import { TimelineChart } from './charts/TimelineChart';
import { CorrelationChart } from './charts/CorrelationChart';



interface Submission {
    id: number;
    created_at: string;
    data: QuestionnaireData;
}

export const AdminDashboard: React.FC = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        setError('');

        try {
            // Fetch data from Supabase
            const { data, error } = await supabase
                .from('questionnaire_responses')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Parse the JSON data if it's stored as a string, or use directly if JSONB
            // Assuming 'data' column in Supabase is JSONB or JSON
            setSubmissions(data || []);
        } catch (err: any) {
            console.error('Error fetching submissions:', err);
            // Fallback for demo if Supabase isn't connected
            const localData = localStorage.getItem('questionnaire_submissions');
            if (localData) {
                setSubmissions(JSON.parse(localData));
            } else {
                setError('Could not fetch data. Please ensure Supabase is connected.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [facultyFilter, setFacultyFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortField, setSortField] = useState<'date' | 'name' | 'gpa'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [flaggedIds, setFlaggedIds] = useState<number[]>(() => {
        const saved = localStorage.getItem('admin_flagged_submissions');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFlag = (id: number) => {
        setFlaggedIds(prev => {
            const newFlags = prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id];
            localStorage.setItem('admin_flagged_submissions', JSON.stringify(newFlags));
            return newFlags;
        });
    };

    const handleSort = (field: 'date' | 'name' | 'gpa') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder(field === 'name' ? 'asc' : 'desc');
        }
    };

    // Extract unique faculties for the dropdown filter
    const uniqueFaculties = Array.from(new Set(submissions.map(s => s.data.faculty))).filter(Boolean).sort();

    // Filter and Paginate
    const filteredSubmissions = submissions
        .filter(sub => {
            const subDate = new Date(sub.created_at);
            const isAfterStart = !startDate || subDate >= new Date(startDate);
            
            // For endDate, we need to include the entire day, so we adjust to midnight of the next day
            let isBeforeEnd = true;
            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1); // include the end date day
                isBeforeEnd = subDate < end;
            }

            return (
                isAfterStart &&
                isBeforeEnd &&
                (sub.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.data.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (facultyFilter === '' || sub.data.faculty === facultyFilter)
            );
        })
        .sort((a, b) => {
            let valA: string | number, valB: string | number;
            
            if (sortField === 'name') {
                valA = a.data.name.toLowerCase();
                valB = b.data.name.toLowerCase();
            } else if (sortField === 'gpa') {
                valA = parseFloat(a.data.gpa) || 0;
                valB = parseFloat(b.data.gpa) || 0;
            } else {
                valA = new Date(a.created_at).getTime();
                valB = new Date(b.created_at).getTime();
            }

            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    const paginatedSubmissions = filteredSubmissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this submission?')) return;

        try {
            const { error } = await supabase
                .from('questionnaire_responses')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setSubmissions(submissions.filter(sub => sub.id !== id));
        } catch (err: any) {
            console.error('Error deleting submission:', err);

            // Fallback for local demo
            const localData = localStorage.getItem('questionnaire_submissions');
            if (localData) {
                const parsed = JSON.parse(localData);
                const updated = parsed.filter((sub: Submission) => sub.id !== id);
                localStorage.setItem('questionnaire_submissions', JSON.stringify(updated));
                setSubmissions(updated);
            } else {
                alert('Failed to delete submission');
            }
        }
    };

    const exportToCSV = () => {
        if (submissions.length === 0) return;

        // Flatten the data for CSV
        const csvRows = [];

        // Headers
        const headers = [
            'ID', 'Date Submitted',
            'Student Name', 'Age', 'Gender', 'Faculty', 'Department', 'Degree Program', 'Year of Study', 'GPA',
            'Father\'s Education', 'Mother\'s Education', 'Father\'s Occupation', 'Mother\'s Occupation', 'Family Business', 'Business Type', 'Self Employed (Family)', 'Financial Stability', 'Financial Support',
            'Skill: Technical', 'Skill: Problem Solving', 'Skill: Communication', 'Skill: Teamwork', 'Skill: Digital Literacy', 'Skill: Project Management', 'Skill: Leadership',
            'Internships Completed', 'Professional Certifications', 'Certification Details', 'Industry Trends Awareness',
            'Primary Career Goal', 'Employer Preference', 'Expected Salary', 'Willingness to Relocate', 'Job Stability Importance',
            'Entrepreneurial: Skills', 'Entrepreneurial: Opportunities', 'Entrepreneurial: Challenges', 'Entrepreneurial: Resources', 'Entrepreneurial: Risks',
            'Career Services Usage', 'Professional Network', 'University Preparation',
            'Primary Employment Barrier', 'Top Success Factor'
        ];
        csvRows.push(headers.map(h => `"${h}"`).join(','));

        submissions.forEach(sub => {
            const escapeCsv = (str: string | undefined | null) => {
                if (str === null || str === undefined || str.trim() === '') return '"-"'; // Clean empty state
                // Remove newlines and carriage returns to prevent row breaking in spreadsheet software
                const singleLineStr = String(str).replace(/[\r\n]+/g, ' ').trim();
                // Replace double quotes with two double quotes to escape them in CSV
                const escapedString = singleLineStr.replace(/"/g, '""');
                return `"${escapedString}"`;
            };

            const data = sub.data;
            const row = [
                sub.id,
                escapeCsv(new Date(sub.created_at).toLocaleString()),
                escapeCsv(data.name),
                escapeCsv(data.age),
                escapeCsv(data.gender),
                escapeCsv(data.faculty),
                escapeCsv(data.department),
                escapeCsv(data.degreeProgram),
                escapeCsv(data.currentYear),
                escapeCsv(data.gpa),

                escapeCsv(data.fatherEducation),
                escapeCsv(data.motherEducation),
                escapeCsv(data.fatherOccupation),
                escapeCsv(data.motherOccupation),
                escapeCsv(data.familyBusiness),
                escapeCsv(data.familyBusinessType),
                escapeCsv(data.familySelfEmployed),
                escapeCsv(data.familyFinancialStability),
                escapeCsv(data.familyFinancialSupport),

                escapeCsv(data.skills?.technical),
                escapeCsv(data.skills?.problemSolving),
                escapeCsv(data.skills?.communication),
                escapeCsv(data.skills?.teamwork),
                escapeCsv(data.skills?.digitalLiteracy),
                escapeCsv(data.skills?.projectManagement),
                escapeCsv(data.skills?.leadership),

                escapeCsv(data.internships),
                escapeCsv(data.certifications),
                escapeCsv(data.certificationsList),
                escapeCsv(data.industryTrends),

                // Merge "Other" fields into the primary column for a cleaner spreadsheet
                escapeCsv(data.careerGoal === 'Other' ? data.careerGoalOther : data.careerGoal),
                escapeCsv(data.employerPreference),
                escapeCsv(data.salaryRange),
                escapeCsv(data.relocation),
                escapeCsv(data.jobStability),

                escapeCsv(data.entrepreneurship?.skills),
                escapeCsv(data.entrepreneurship?.opportunities),
                escapeCsv(data.entrepreneurship?.challenges),
                escapeCsv(data.entrepreneurship?.resources),
                escapeCsv(data.entrepreneurship?.risks),

                escapeCsv(data.careerServices),
                escapeCsv(data.professionalNetwork),
                escapeCsv(data.universityPreparation),

                escapeCsv(data.employmentBarrier === 'Other' ? data.employmentBarrierOther : data.employmentBarrier),
                escapeCsv(data.employmentFactor === 'Other' ? data.employmentFactorOther : data.employmentFactor)
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join("\n");
        // Add UTF-8 BOM for Excel compatibility
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "questionnaire_submissions.csv");
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h2 className="section-title text-3xl">Survey Submissions</h2>
                    <p className="text-gray-500 mt-1">Manage and view student questionnaire responses</p>
                </div>
                <div className="dashboard-actions">
                    <button onClick={fetchSubmissions} className="btn btn-secondary shadow-sm" title="Refresh">
                        <RefreshCw className="icon-sm" /> Refresh
                    </button>
                    <button onClick={exportToCSV} className="btn btn-primary shadow-lg" title="Export CSV">
                        <Download className="icon-sm" /> Export CSV
                    </button>
                    <button onClick={handleLogout} className="btn btn-secondary text-red-600 border-red-200 hover:bg-red-50 shadow-sm" title="Logout">
                        <LogOut className="icon-sm" /> Logout
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            {!loading && !error && (
                <>
                    <div className="dashboard-stats-grid">
                        <div className="stat-card">
                            <p className="stat-label">Total Responses</p>
                            <p className="stat-value">{submissions.length}</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Latest Submission</p>
                            <p className="stat-subtext">
                                {submissions.length > 0 ? new Date(submissions[0].created_at).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Average GPA</p>
                            <p className="stat-value-secondary">
                                {submissions.length > 0
                                    ? (submissions.reduce((acc, sub) => acc + (parseFloat(sub.data.gpa) || 0), 0) / submissions.length).toFixed(2)
                                    : '0.00'}
                            </p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    {submissions.length > 0 && (
                        <div className="chart-grid">
                            <div className="chart-card col-span-full">
                                <h3 className="chart-title">Submission Timeline</h3>
                                <div className="chart-wrapper h-64">
                                    <TimelineChart data={filteredSubmissions} />
                                </div>
                            </div>
                            <div className="chart-card">
                                <h3 className="chart-title">Responses by Faculty</h3>
                                <div className="chart-wrapper">
                                    <FacultyBarChart data={filteredSubmissions} />
                                </div>
                            </div>
                            <div className="chart-card">
                                <h3 className="chart-title">Career Intentions</h3>
                                <div className="chart-wrapper">
                                    <CareerIntentionsPieChart data={filteredSubmissions} />
                                </div>
                            </div>
                            <div className="chart-card col-span-full">
                                <h3 className="chart-title">Average GPA by Faculty (Correlation)</h3>
                                <div className="chart-wrapper h-72">
                                    <CorrelationChart data={filteredSubmissions} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {loading ? (
                <div className="empty-state">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading submissions...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center shadow-sm">
                    {error}
                </div>
            ) : submissions.length === 0 ? (
                <div className="empty-state">
                    <div className="mb-4 bg-gray-50 p-4 rounded-full inline-block">
                        <Download className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg">No submissions found yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col">
                    {/* Search and Filter Bar */}
                    <div className="search-toolbar">
                        {/* Search Input */}
                        <div className="search-container">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search Name or Department..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        
                        {/* Filters */}
                        <div className="filter-controls">
                            {/* Date Group */}
                            <div className="date-filter-group">
                                <span className="filter-label">From</span>
                                <input 
                                    type="date" 
                                    className="date-input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <div className="filter-divider"></div>
                                <span className="filter-label">To</span>
                                <input 
                                    type="date" 
                                    className="date-input"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>

                            {/* Faculty Dropdown */}
                            <select 
                                className="select filter-select"
                                value={facultyFilter}
                                onChange={(e) => {
                                    setFacultyFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">All Faculties</option>
                                {uniqueFaculties.map(fac => (
                                    <option key={fac} value={fac}>{fac}</option>
                                ))}
                            </select>
                            
                            {/* Clear Button */}
                            {(startDate || endDate || facultyFilter || searchTerm) && (
                                <button 
                                    onClick={() => {
                                        setStartDate('');
                                        setEndDate('');
                                        setFacultyFilter('');
                                        setSearchTerm('');
                                    }}
                                    className="btn-clear"
                                >
                                    Clear All
                                </button>
                            )}

                            <div className="pagination-stat">
                                {paginatedSubmissions.length} of {filteredSubmissions.length}
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="w-12 text-center">Fav</th>
                                    <th 
                                        className="cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('date')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Date <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                        </div>
                                    </th>
                                    <th 
                                        className="cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Name <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                        </div>
                                    </th>
                                    <th>Faculty</th>
                                    <th>Dept</th>
                                    <th>Program</th>
                                    <th 
                                        className="cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('gpa')}
                                    >
                                        <div className="flex items-center gap-1">
                                            GPA <ArrowUpDown className="w-3 h-3 text-gray-400" />
                                        </div>
                                    </th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedSubmissions.map((sub) => {
                                    const isFlagged = flaggedIds.includes(sub.id);
                                    return (
                                    <tr key={sub.id} className={`table-row-hover ${isFlagged ? 'row-flagged' : ''}`}>
                                        <td className="text-center">
                                            <button 
                                                onClick={() => toggleFlag(sub.id)}
                                                className={`btn-flag ${isFlagged ? 'active' : ''}`}
                                                title={isFlagged ? "Unflag" : "Flag this submission"}
                                            >
                                                <Star className="icon-sm" fill={isFlagged ? "currentColor" : "none"} />
                                            </button>
                                        </td>
                                        <td className="font-medium text-gray-600">
                                            {new Date(sub.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="font-semibold text-gray-900">
                                            {sub.data.name}
                                        </td>
                                        <td>{sub.data.faculty}</td>
                                        <td>{sub.data.department}</td>
                                        <td>{sub.data.degreeProgram}</td>
                                        <td>
                                            <span className={`status-badge ${parseFloat(sub.data.gpa) >= 4.0 ? 'bg-green-100 text-green-800 border border-green-200' :
                                                parseFloat(sub.data.gpa) >= 3.0 ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                                    parseFloat(sub.data.gpa) >= 2.0 ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                                        'bg-gray-100 text-gray-800 border border-gray-200'
                                                }`}>
                                                {sub.data.gpa}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons justify-end">
                                                <button
                                                    onClick={() => setSelectedSubmission(sub)}
                                                    className="btn-icon btn-view"
                                                    title="View Details"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="btn-icon btn-delete"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="icon-sm" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    );
                                })}
                                {paginatedSubmissions.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-gray-500">
                                            No results found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <div className="pagination-controls">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="btn-page"
                                >
                                    <ChevronLeft className="icon-sm" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="btn-page"
                                >
                                    <ChevronRight className="icon-sm" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {selectedSubmission && (
                <ResponseDetailModal
                    isOpen={!!selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                    data={selectedSubmission.data}
                    submissionDate={selectedSubmission.created_at}
                />
            )}
        </div>
    );
};
