import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { QuestionnaireData } from '../../types';

interface ChartProps {
    data: { data: QuestionnaireData }[];
}

export const FacultyBarChart: React.FC<ChartProps> = ({ data }) => {
    // Process data to count students per faculty
    const facultyCounts: Record<string, number> = {};
    data.forEach(item => {
        const faculty = item.data.faculty || 'Unknown';
        facultyCounts[faculty] = (facultyCounts[faculty] || 0) + 1;
    });

    const chartData = Object.keys(facultyCounts).map(key => ({
        name: key,
        count: facultyCounts[key],
    })).sort((a, b) => b.count - a.count); // Sort by count descending

    const COLORS = ['#003366', '#FFD700', '#004d99', '#ffe44d', '#002244'];

    if (chartData.length === 0) {
        return <div className="text-center text-gray-500 py-10">No data available</div>;
    }

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
