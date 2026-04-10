import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { QuestionnaireData } from '../types';
import { Download, RefreshCw, LogOut, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResponseDetailModal } from './ResponseDetailModal';
import { FacultyBarChart } from './charts/FacultyBarChart';
import { CareerIntentionsPieChart } from './charts/CareerIntentionsPieChart';



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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and Paginate
    const filteredSubmissions = submissions.filter(sub =>
        sub.data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.data.faculty.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

        // Headers (dynamically based on first submission or key fields)
        const headers = ['ID', 'Date', 'Name', 'Faculty', 'Department', 'Degree', 'GPA'];
        csvRows.push(headers.join(','));

        submissions.forEach(sub => {
            const row = [
                sub.id,
                new Date(sub.created_at).toLocaleDateString(),
                `"${sub.data.name}"`, // Quote to handle commas
                `"${sub.data.faculty}"`,
                `"${sub.data.department}"`,
                `"${sub.data.degreeProgram}"`,
                sub.data.gpa
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "questionnaire_submissions.csv");
        document.body.appendChild(link);
        link.click();
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
                            <div className="chart-card">
                                <h3 className="chart-title">Responses by Faculty</h3>
                                <div className="chart-wrapper">
                                    <FacultyBarChart data={submissions} />
                                </div>
                            </div>
                            <div className="chart-card">
                                <h3 className="chart-title">Career Intentions</h3>
                                <div className="chart-wrapper">
                                    <CareerIntentionsPieChart data={submissions} />
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
                    {/* Search Bar */}
                    <div className="search-toolbar">
                        <div className="search-container">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by Name or Faculty..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                            />
                        </div>
                        <div className="search-results-text">
                            Showing {paginatedSubmissions.length} of {filteredSubmissions.length} results
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Faculty</th>
                                    <th>Dept</th>
                                    <th>Program</th>
                                    <th>GPA</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedSubmissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
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
                                            <div className="action-buttons">
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
                                ))}
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
