import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8 relative">
                    <h1 className="text-9xl font-bold text-gray-200">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl font-bold text-gray-800 bg-gray-50 px-4">
                            Page Not Found
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 mb-8 text-lg">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="mt-16 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Takoradi Technical University
            </div>
        </div>
    );
};
